package com.hackathon.grupp5.backend.model.frontenddto;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Double total_weight;
    @JsonProperty("totalMeals")
    private Integer totalMeals;

    public FrontendGraphDTO(String town, Date eta_date, Double total_weight) {
        this.town = town;
        this.eta_date = eta_date;
        this.total_weight = total_weight;
        this.totalMeals = 0;
    }
}