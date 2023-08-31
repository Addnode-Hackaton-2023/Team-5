package com.hackathon.grupp5.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import com.hackathon.grupp5.backend.consts.Status;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendETA;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO;
import com.hackathon.grupp5.backend.model.frontenddto.TotalDelivered;
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

    private int mealFactor = 4;
    private int co2Factor = 2;
    private int moneyFactor = 50;

    /**
     * add new ETA
     */
    public String add(ETA eta)
    {
        etaRepository.save(eta);
        return"new eta: " + eta.getId();
    }

    /**
     * update ETA
     */
    public String update(ETA eta)
    {
        return add(eta);
    }

    /**
     * get ETA by id
     */
    public Optional<ETA> getEtaById(Long id)
    {
        return etaRepository.findById(id);
    }

    /**
     * get all ETA by status
     */
    public List<ETA> getAllByStatus(Status status) {
        return etaRepository.findAllByStatus(status);
    }

    public Optional<FrontendETA> getETAMappedToFrontEndDTO(Long id) {
        Optional<ETA> savedETA = etaRepository.findById(id);
        return savedETA.map(s -> new FrontendETA(s.getEta(), s.getLongitude(), s.getLatitude(), s.getStatus().toString()));
    }

    public Optional<TotalDelivered> getTotalDelivered() {
        var finishedEtas = getAllByStatus(Status.FINISHED);
        if (finishedEtas.isEmpty()) {
            return Optional.empty();
        } else {
            var totalWeight = finishedEtas.stream().mapToDouble(eta -> eta.getWeight()).sum();
            return Optional.of(new TotalDelivered(totalWeight * mealFactor, totalWeight * co2Factor, totalWeight * moneyFactor));
        }
    }

    public List<FrontendGraphDTO> getDeliveryChartDTO() {
        return etaRepository.getDeliveryGraph();
    }
}
