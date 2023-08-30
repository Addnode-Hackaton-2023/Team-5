package com.hackathon.grupp5.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    public @ResponseBody List addEta(@RequestBody HashMap data){

        // ...

        return null;
    }

    @GetMapping(path = "/get") public @ResponseBody String getEta(){
        List<String> list = new ArrayList();

        // ...

        //return etaService.getEtaById(1L);
        return "YööY";
    }

}
