package com.hackathon.grupp5.backend.service;

import com.hackathon.grupp5.backend.consts.Status;
import com.hackathon.grupp5.backend.model.ETA;
import com.hackathon.grupp5.backend.model.externaldto.ExternalRouteInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Configuration
@EnableScheduling

public class BackgroundTasks {

    @Autowired
    ETAService etaService;
    @Scheduled(fixedDelay = 60000)
    public void updateRoutes() {
        final String uri = "https://allwinapi20230830114644.azurewebsites.net/api/Job/GetActiveJobs";
        RestTemplate restTemplate = new RestTemplate();
        ExternalRouteInstance[] result = restTemplate.getForObject(uri, ExternalRouteInstance[].class);
        ETA mockETA = new ETA(
                1L,
                LocalDateTime.now(),
                2132131.0,
                -435436543.0,
                36.0,
                "Göteborg",
                "Någon kyrka",
                "0704559931",
                Status.ACTIVE);
        etaService.add(mockETA);

        if (result != null) {
            //Map external object to local object
            List<ETA> listOfRecievedETA = Arrays.stream(result).map(routeInstance -> {
                String jsonString = "2023-08-30T17:37:30.6030532+00:00";
                DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
                OffsetDateTime offsetDateTime = OffsetDateTime.parse(jsonString, formatter);

                var recpient = "";
                var recpientPhoneNumber = "";
                if (routeInstance.getStops().length > 0) {
                    recpient = routeInstance.getStops()[routeInstance.getStops().length - 1].getName();
                    recpientPhoneNumber = routeInstance.getStops()[routeInstance.getStops().length - 1].getContactPerson();
                }

                ETA eta = new ETA(
                        routeInstance.getRouteId(),
                        offsetDateTime.toLocalDateTime(),
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
            var activeEtas = etaService.getAllByStatus(Status.ACTIVE);
            var filteredInactiveEtaList = activeEtas.stream()
                    .filter(eta -> listOfRecievedETA.stream().anyMatch(recievedETA -> !Objects.equals(recievedETA.getId(), eta.getId()))).toList();

            filteredInactiveEtaList.forEach(eta -> {
                eta.setStatus(Status.FINISHED);
                etaService.update(eta);
            });

            //Go over the list and make new ETA if it not exists and send SMS to the client. If exists just update.
            listOfRecievedETA.forEach(eta -> {
                Optional<ETA> savedETA = etaService.getEtaById(eta.getId());
                if (savedETA.isPresent()) {
                    etaService.add(eta);
                } else {
                    etaService.update(eta);
                }
            });


        }

    }

}
