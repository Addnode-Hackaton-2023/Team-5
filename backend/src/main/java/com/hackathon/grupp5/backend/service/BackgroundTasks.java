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
    public void backgroundRunner() {
        etaService.updateTasks();
    }

}
