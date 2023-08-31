import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { initializeMap, initializeView, mapLoaded, addMarker } from "./Map";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import carIcon from "../../imgs/icons8-car-50.png";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

interface MarkerData {
  longitude: number;
  latitude: number;
  symbol?: SimpleMarkerSymbol | PictureMarkerSymbol;
}

const createCarSymbol = (): PictureMarkerSymbol => {
  return new PictureMarkerSymbol({
    url: carIcon,
    width: "40px",
    height: "40px",
  });
};

interface WebMapProps {
  markerData?: MarkerData;
  markersDataList?: MarkerData[];
}

const WebMap: React.FC<WebMapProps> = ({ markerData, markersDataList }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = initializeMap();
      const view = initializeView(map, mapRef.current);

      mapLoaded(view)
        .then(() => {
          const carSymbol = createCarSymbol();
          if (Array.isArray(markersDataList)) {
            // If props is an array of MarkersData
            markersDataList.forEach(
              ({ longitude, latitude, symbol = carSymbol }) => {
                addMarker(view, longitude, latitude, symbol);
              }
            );
          }
          if (markerData) {
            // If props is a single MarkersData object
            const { longitude, latitude, symbol = carSymbol } = markerData;
            addMarker(view, longitude, latitude, symbol);
          }
        })
        .catch((error) =>
          console.error("An error occurred while loading the map: ", error)
        );
    }
  }, [mapRef, markerData, markersDataList]);

  return (
    <Box
      ref={mapRef}
      id="viewDiv"
      sx={{
        height: "50vh",
        width: "100%",
      }}
    />
  );
};

export default WebMap;
