package com.hackathon.grupp5.backend.model.externaldto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({"routeInstanceId", "routeName", "eta", "id", "latestLatitude", "latestLongitude", "loadedWeight"})
@Data
public class ExternalRouteInstance {

    @JsonProperty("jobId")
    private Long jobId;
    @JsonProperty("routeId")
    private Long routeId;
    @JsonProperty("routeName")
    private String routeName;
    @JsonProperty("townName")
    private String townName;
    @JsonProperty("eta")
    private String eta;
    @JsonProperty("latestLatitude")
    private Double latestLatitude;
    @JsonProperty("latestLongitude")
    private Double latestLongitude;
    @JsonProperty("loadedWeight")
    private Double loadedWeight;
    @JsonProperty("currentJobStops")
    private ExternalStop[] stops;
}
