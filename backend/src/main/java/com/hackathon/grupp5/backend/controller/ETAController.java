package com.hackathon.grupp5.backend.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.grupp5.backend.service.ETAService;

@RestController
@RequestMapping(path = "/eta")
public class ETAController
{
    @Autowired
    ETAService etaService;

    @PostMapping(path = "/add")
    public @ResponseBody List addEta(){
        return Collections.singletonList(etaService.addEta());
    }

    @GetMapping(path = "/get/{id}") public @ResponseBody String getEta(@PathVariable Long id){
        System.out.println("id = " + id);
        return etaService.getEtaById(id).get().toString();
    }

}
