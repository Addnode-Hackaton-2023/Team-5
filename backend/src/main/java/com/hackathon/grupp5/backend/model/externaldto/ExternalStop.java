package com.hackathon.grupp5.backend.model.externaldto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({"stopId", "routeId", "latitude", "longitude", "name", "adress", "contactPerson"})
@Data
public class ExternalStop {
    @JsonProperty("stopId")
    private Long stopId;
    @JsonProperty("stopName")
    private String stopName;
    @JsonProperty("contactPerson")
    private String contactPerson;
}
