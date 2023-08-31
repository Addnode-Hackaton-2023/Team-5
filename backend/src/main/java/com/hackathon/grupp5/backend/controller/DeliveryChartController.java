package com.hackathon.grupp5.backend.controller;

import com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO;
import com.hackathon.grupp5.backend.service.ETAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping(path = "/deliverychart")
public class DeliveryChartController {
    @Autowired
    ETAService etaService;

    @GetMapping public @ResponseBody List<FrontendGraphDTO> getEta(){
        return etaService.getDeliveryChartDTO();
    }
}
