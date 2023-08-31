package com.hackathon.grupp5.backend.model.frontenddto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonRootName("ETA")
public class TotalDelivered {
    @JsonProperty("meals")
    private Double meals;
    @JsonProperty("co2")
    private Double co2;
    @JsonProperty("money")
    private Double money;
}
