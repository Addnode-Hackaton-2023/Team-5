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

    /**
     * add new ETA
     */
    public String addEta(ETA eta)
    {
        etaRepository.save(eta);
        return"new eta: " + eta.getId();
    }

    /**
     * get ETA by id
     */
    public Optional<ETA> getEtaById(Long id)
    {
        return etaRepository.findById(id);
    }
}
