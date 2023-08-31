package com.hackathon.grupp5.backend.controller;

import com.hackathon.grupp5.backend.model.frontenddto.CitatDTO;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendETA;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO;
import com.hackathon.grupp5.backend.service.ETAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/recipient")
public class RecipientController {

    @Autowired
    ETAService etaService;

    @GetMapping(path = "/latest") public @ResponseBody ResponseEntity<CitatDTO> getLatest(){
        var citatDTO = etaService.getLatestDelivery();
        return citatDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }
}
