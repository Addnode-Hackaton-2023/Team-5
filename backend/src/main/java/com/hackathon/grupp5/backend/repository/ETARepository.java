package com.hackathon.grupp5.backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackathon.grupp5.backend.model.ETA;

public interface ETARepository extends JpaRepository<ETA, Long>
{
}
