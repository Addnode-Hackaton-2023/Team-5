package com.hackathon.grupp5.backend.model.frontenddto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName("ETA")
public class FrontendETA {
    @JsonProperty("eta")
    private LocalDateTime eta;
    @JsonProperty("longitude")
    private Double longitude;
    @JsonProperty("latitude")
    private Double latitude;
    @JsonProperty("status")
    private String status;
}
