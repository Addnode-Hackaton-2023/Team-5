package com.hackathon.grupp5.backend.repository;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hackathon.grupp5.backend.model.ETAModel;

public interface ETARepository extends CrudRepository<ETAModel, Long>
{
    @Override
    Optional<ETAModel> findById(Long aLong);
}
