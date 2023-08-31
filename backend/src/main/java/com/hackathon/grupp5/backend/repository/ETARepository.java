package com.hackathon.grupp5.backend.repository;


import java.util.List;
import java.util.Optional;

import com.hackathon.grupp5.backend.consts.Status;
import com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.grupp5.backend.model.ETA;
import org.springframework.data.jpa.repository.Query;

public interface ETARepository extends JpaRepository<ETA, Long>
{
    List<ETA> findAllByStatus(Status status);

    @Query("SELECT NEW com.hackathon.grupp5.backend.model.frontenddto.FrontendGraphDTO(e.town, CAST(e.eta AS date), SUM(e.weight)) FROM ETA e GROUP BY e.town, CAST(e.eta AS date) ORDER BY e.town, CAST(e.eta AS date)")
    List<FrontendGraphDTO> getDeliveryGraph();

    List<ETA> findTopByStatusOrderByEtaDesc(Status status);
}
