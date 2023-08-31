package com.hackathon.grupp5.backend.model.frontenddto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName("DeliveryChartDTO")
public class CitatDTO {
    @JsonProperty("town")
    private String recpient;
    @JsonProperty("totalMeals")
    private Integer totalMeals;
}