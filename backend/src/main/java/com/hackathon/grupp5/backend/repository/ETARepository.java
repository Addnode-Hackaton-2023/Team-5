package com.hackathon.grupp5.backend.repository;


import java.util.List;
import java.util.Optional;

import com.hackathon.grupp5.backend.consts.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.grupp5.backend.model.ETA;

public interface ETARepository extends JpaRepository<ETA, Long>
{
    List<ETA> findAllByStatus(Status status);
}
