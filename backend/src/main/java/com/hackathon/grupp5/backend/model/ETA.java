package com.hackathon.grupp5.backend.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hackathon.grupp5.backend.consts.Status;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ETA
{
    @Id
    private Long id;
    private LocalDateTime eta;
    private Double longitude;
    private Double latitude;
    private Double weight;
    private Status status;
}
