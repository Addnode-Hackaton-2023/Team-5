package com.hackathon.grupp5.backend.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hackathon.grupp5.backend.model.ETA;
import com.hackathon.grupp5.backend.repository.ETARepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ETAService
{
    @Autowired
    ETARepository etaRepository;

    public String addEta()
    {
        etaRepository.save(
            new ETA(555555L, LocalDateTime.now(), -77.0364,38.8951, 5.0)
        );
        return"new eta saved";
    }
    public Optional<ETA> getEtaById(Long id)
    {
        return etaRepository.findById(id);
    }
}
