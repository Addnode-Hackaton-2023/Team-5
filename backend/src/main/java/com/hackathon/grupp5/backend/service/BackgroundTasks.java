package com.hackathon.grupp5.backend.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling

public class BackgroundTasks {

    @Scheduled(fixedDelay = 60000)
    public void updateRoute() {
        final String uri = "http://localhost:8080/springrestexample/employees.xml";

        //RestTemplate restTemplate = new RestTemplate();
        //String result = restTemplate.getForObject(uri, String.class);

        System.out.println(uri);
    }

}
