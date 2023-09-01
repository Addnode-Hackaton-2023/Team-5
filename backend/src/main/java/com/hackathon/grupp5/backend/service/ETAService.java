package com.hackathon.grupp5.backend.service;

import com.hackathon.grupp5.backend.consts.Status;
import com.hackathon.grupp5.backend.model.ETA;
import com.hackathon.grupp5.backend.model.externaldto.ExternalRouteInstance;
import com.hackathon.grupp5.backend.model.frontenddto.CitatDTO;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendETA;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO;
import com.hackathon.grupp5.backend.model.frontenddto.TotalDelivered;
import com.hackathon.grupp5.backend.repository.ETARepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@RequiredArgsConstructor
@Service
public class ETAService {
    private static final String ExternalGetActiveJobsServiceURL = "https://allwinapi20230830114644.azurewebsites.net/api/Job/GetActiveJobs";
    private static final String ExternalIsJobActiveURL = "https://allwinapi20230830114644.azurewebsites.net/api/Job/IsActiveJob";
    @Autowired
    ETARepository etaRepository;

    private final int mealFactor = 4;
    private final int co2Factor = 2;
    private final int moneyFactor = 50;

    /**
     * add new ETA
     */
    public String add(ETA eta) {
        etaRepository.save(eta);
        return "new eta: " + eta.getId();
    }

    /**
     * update ETA
     */
    public String update(ETA eta) {
        return add(eta);
    }

    /**
     * get ETA by id
     */
    public Optional<ETA> getEtaById(Long id) {
        return etaRepository.findById(id);
    }

    /**
     * get all ETA by status
     */
    public List<ETA> getAllByStatus(Status status) {
        return etaRepository.findAllByStatus(status);
    }

    public Optional<FrontendETA> getETAMappedToFrontEndDTO(Long id) {
        Optional<ETA> savedETA = etaRepository.findById(id);
        return savedETA.map(s -> new FrontendETA(s.getEta(), s.getLongitude(), s.getLatitude(), s.getStatus().toString()));
    }

    public Optional<TotalDelivered> getTotalDelivered() {
        var finishedEtas = getAllByStatus(Status.FINISHED);
        if (finishedEtas.isEmpty()) {
            return Optional.empty();
        } else {
            var totalWeight = finishedEtas.stream().mapToDouble(ETA::getWeight).sum();
            return Optional.of(new TotalDelivered(totalWeight * mealFactor, totalWeight * co2Factor, totalWeight * moneyFactor));
        }
    }

    public List<FrontendGraphDTO> getDeliveryChartDTO() {
        AtomicReference<Integer> totalWeight = new AtomicReference<>(0);
        return etaRepository.getDeliveryGraph().stream().peek(dto -> {
            totalWeight.set(totalWeight.get() + dto.getTotal_weight().intValue());
            dto.setTotalMeals(totalWeight.get() * mealFactor);
        }).toList();
    }

    public Optional<CitatDTO> getLatestDelivery() {
        return etaRepository.findTopByStatusOrderByEtaDesc(Status.FINISHED).stream().findFirst().map(dto -> new CitatDTO(dto.getRecipient(), dto.getWeight().intValue() * 4));
    }

    public void updateTasks() {
        RestTemplate restTemplate = new RestTemplate();
        //Ask for active jobs from remote service
        ExternalRouteInstance[] result = restTemplate.getForObject(ExternalGetActiveJobsServiceURL, ExternalRouteInstance[].class);

        if (result != null) {
            List<ETA> listOfRecievedETA = Arrays.stream(result).map(routeInstance -> {

                var recpient = "";
                var recpientPhoneNumber = "";
                if (routeInstance.getStops().length > 0) {
                    recpient = routeInstance.getStops()[routeInstance.getStops().length - 1].getStopName();
                    recpientPhoneNumber = routeInstance.getStops()[routeInstance.getStops().length - 1].getContactPerson();
                }

                return new ETA(
                        routeInstance.getJobId(),
                        LocalDateTime.parse(routeInstance.getEta()),
                        routeInstance.getLatestLongitude(),
                        routeInstance.getLatestLatitude(),
                        routeInstance.getLoadedWeight(),
                        routeInstance.getTownName(),
                        recpient,
                        recpientPhoneNumber,
                        Status.ACTIVE
                );
            }).toList();


            //Go over the list in database and set the ETAs that wasn't recieved to inactive.
            var activeEtas = getAllByStatus(Status.ACTIVE);
            activeEtas.forEach(eta -> {
                try {
                    String isActiveURL = ExternalIsJobActiveURL + "?jobId=" + eta.getId();
                    ResponseEntity<Boolean> isActive = restTemplate.exchange(
                            isActiveURL, HttpMethod.GET, null, Boolean.class);
                    if (isActive.getStatusCode().is2xxSuccessful()) {
                        Boolean responseValue = isActive.getBody();
                        if (responseValue != null && !responseValue) {
                            eta.setStatus(Status.FINISHED);
                            update(eta);
                        }
                    } else if (isActive.getStatusCode().isError()) {
                        System.out.println("Jobb id: " + eta.getId() + " hittades inte eller så är deras server nere");
                    }
                } catch (Exception e) {
                    System.out.println("Jobb id: " + eta.getId() + " lyckades inte kontrolleras eftersom deras server verkar vara nere");
                }
            });
            //Go over the list and make new ETA if it not exists and send SMS to the client. If exists just update.
            listOfRecievedETA.forEach(eta -> {
                Optional<ETA> savedETA = getEtaById(eta.getId());
                if (savedETA.isEmpty()) {
                    add(eta);
                    //Here should a sms be sent
                    System.out.println("Hej din leverans är på väg till dig, se mer information om din leverans på denna sida: http://localhost:3000/eta/" + eta.getId());
                } else {
                    update(eta);
                }
            });
        }
    }
}
