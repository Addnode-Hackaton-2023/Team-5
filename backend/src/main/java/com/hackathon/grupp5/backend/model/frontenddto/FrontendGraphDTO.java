package com.hackathon.grupp5.backend.model.frontenddto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName("DeliveryChartDTO")
public class FrontendGraphDTO {
    @JsonProperty("town")
    private String town;
    @JsonProperty("date")
    private Date eta_date;
    @JsonProperty("totalWeight")
    private Double total_weight;
}