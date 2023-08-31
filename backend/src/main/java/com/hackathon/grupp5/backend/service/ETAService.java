package com.hackathon.grupp5.backend.service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import com.hackathon.grupp5.backend.consts.Status;
import com.hackathon.grupp5.backend.model.externaldto.ExternalRouteInstance;
import com.hackathon.grupp5.backend.model.frontenddto.CitatDTO;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendETA;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO;
import com.hackathon.grupp5.backend.model.frontenddto.TotalDelivered;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.hackathon.grupp5.backend.model.ETA;
import com.hackathon.grupp5.backend.repository.ETARepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class ETAService
{
    @Autowired
    ETARepository etaRepository;

    private int mealFactor = 4;
    private int co2Factor = 2;
    private int moneyFactor = 50;

    /**
     * add new ETA
     */
    public String add(ETA eta)
    {
        etaRepository.save(eta);
        return"new eta: " + eta.getId();
    }

    /**
     * update ETA
     */
    public String update(ETA eta)
    {
        return add(eta);
    }

    /**
     * get ETA by id
     */
    public Optional<ETA> getEtaById(Long id)
    {
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
            dto.setTotalMeals(totalWeight.get() * 4);
        }).toList();
    }

    public Optional<CitatDTO> getLatestDelivery() {
        return etaRepository.findTopByStatusOrderByEtaDesc(Status.FINISHED).stream().findFirst().map(dto -> new CitatDTO(dto.getRecipient(), dto.getWeight().intValue() * 4));
    }

    public void updateTasks() {
        final String uri = "https://allwinapi20230830114644.azurewebsites.net/api/Job/GetActiveJobs";
        RestTemplate restTemplate = new RestTemplate();
        ExternalRouteInstance[] result = restTemplate.getForObject(uri, ExternalRouteInstance[].class);

        if (result != null) {
            //Map external object to local object
            List<ETA> listOfRecievedETA = Arrays.stream(result).map(routeInstance -> {

                var recpient = "";
                var recpientPhoneNumber = "";
                if (routeInstance.getStops().length > 0) {
                    recpient = routeInstance.getStops()[routeInstance.getStops().length - 1].getStopName();
                    recpientPhoneNumber = routeInstance.getStops()[routeInstance.getStops().length - 1].getContactPerson();
                    if(routeInstance.getJobId() == 1) {
                        System.out.println("Här fick vi null");
                    }
                }

                ETA eta = new ETA(
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

                return eta;
            }).toList();


            //Go over the list in database and set the ETAs that wasn't recieved to inactive.
            var activeEtas = getAllByStatus(Status.ACTIVE);
            activeEtas.forEach(eta -> {
                String isActiveURL = "https://allwinapi20230830114644.azurewebsites.net/api/Job/IsActiveJob?jobId=" + eta.getId();
                ResponseEntity<Boolean> isActive = restTemplate.exchange(
                        isActiveURL, HttpMethod.GET, null, Boolean.class);
                if(isActive.getStatusCode().is2xxSuccessful()) {
                    Boolean responseValue = isActive.getBody();
                    if(responseValue != null && !responseValue) {
                        eta.setStatus(Status.FINISHED);
                        update(eta);
                    }
                } else if (isActive.getStatusCode().isError()) {
                    System.out.println("Jobb id: " + eta.getId() + " hittades inte eller så är deras server nere");
                }
            });
            //Go over the list and make new ETA if it not exists and send SMS to the client. If exists just update.
            listOfRecievedETA.forEach(eta -> {
                Optional<ETA> savedETA = getEtaById(eta.getId());
                if (savedETA.isEmpty()) {
                    add(eta);
                    System.out.println("Hej din leverans är på väg till dig, se mer information om din leverans på denna sida: http://localhost:3000/eta/" + eta.getId());
                } else {
                    update(eta);
                }
            });
        }
    }
}
