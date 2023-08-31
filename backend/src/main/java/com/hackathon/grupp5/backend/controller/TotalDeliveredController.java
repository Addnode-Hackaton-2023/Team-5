package com.hackathon.grupp5.backend.controller;

import com.hackathon.grupp5.backend.model.frontenddto.TotalDelivered;
import com.hackathon.grupp5.backend.service.ETAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/totaldelivered")
public class TotalDeliveredController {
    @Autowired
    ETAService etaService;
    @GetMapping public @ResponseBody Optional<TotalDelivered> getDelivered(){
        return etaService.getTotalDelivered();
    }
}
