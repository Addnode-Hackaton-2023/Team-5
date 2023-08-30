package com.hackathon.grupp5.backend.service;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hackathon.grupp5.backend.repository.ETARepository;

@RequiredArgsConstructor
@Service
public class ETAService
{
    @Autowired
    ETARepository etaRepository;

    public String getEtaById(Long id)
    {
        if (id == 1L) {
            return "YääY";
        } else {
            return "NäääY";
        }
        //return etaRepository.findById(id);
    }
}
