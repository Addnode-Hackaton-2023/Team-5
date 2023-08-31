import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { initializeMap, initializeView, mapLoaded, addMarker } from "./Map";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import carIcon from "../../imgs/icons8-car-50.png";

const createCarSymbol = (): PictureMarkerSymbol => {
  return new PictureMarkerSymbol({
    url: carIcon,
    width: "40px",
    height: "40px",
  });
};

export function WebMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = initializeMap();
      const view = initializeView(map, mapRef.current);

      mapLoaded(view)
        .then(() => {
          const carSymbol = createCarSymbol();

          // Cars in Stockholm
          addMarker(view, 18.0686, 59.3293, carSymbol); // Car 1
          addMarker(view, 18.07, 59.33, carSymbol); // Car 2

          // Cars in Gothenburg
          addMarker(view, 11.9746, 57.7089, carSymbol); // Car 1
          addMarker(view, 11.975, 57.71, carSymbol); // Car 2
          addMarker(view, 11.976, 57.709, carSymbol); // Car 3
        })
        .catch((error) =>
          console.error("An error occurred while loading the map: ", error)
        );
    }
  }, [mapRef]);

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
}
