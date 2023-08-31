package com.hackathon.grupp5.backend.controller;

import java.util.Collections;
import java.util.List;

import com.hackathon.grupp5.backend.model.frontenddto.FrontendETA;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.grupp5.backend.model.ETA;
import com.hackathon.grupp5.backend.service.ETAService;

@RestController
@RequestMapping(path = "/eta")
public class ETAController
{
    @Autowired
    ETAService etaService;

    @PostMapping(path = "/add")
    public @ResponseBody List addEta(@RequestBody ETA eta){
        return Collections.singletonList(etaService.add(eta));
    }

    @GetMapping(path = "/get/{id}") public @ResponseBody ResponseEntity<FrontendETA> getEta(@PathVariable Long id){
        var frontendETA = etaService.getETAMappedToFrontEndDTO(id);
        return frontendETA.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

}
