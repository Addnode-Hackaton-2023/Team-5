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
    @JsonProperty("routeId")
    private Long routeId;
    @JsonProperty("latitude")
    private Double latitude;
    @JsonProperty("longitude")
    private Double longitude;
    @JsonProperty("name")
    private String name;
    @JsonProperty("adress")
    private String adress;
    @JsonProperty("contactPerson")
    private String contactPerson;
}
