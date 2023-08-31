package com.hackathon.grupp5.backend.model;

import java.time.LocalDateTime;

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
    private String town;
    private String recipient;
    private String phoneNumber;
    private Status status;

}
