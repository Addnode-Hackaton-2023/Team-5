import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";

const BASEMAP = "streets-vector";

export const initializeMap = (): ArcGISMap => {
  return new ArcGISMap({ basemap: BASEMAP });
};

export const initializeView = (
  map: ArcGISMap,
  containerId: string,
  center: [number, number] = [14.5, 58.5], // Default value if not passed
  zoom: number = 5 // Default value if not passed
): MapView => {
  return new MapView({
    map,
    container: containerId,
    center,
    zoom,
  });
};

export const addMarker = (
  view: MapView,
  longitude: number,
  latitude: number,
  symbol: SimpleMarkerSymbol | PictureMarkerSymbol
): Graphic => {
  const point = new Point({ longitude, latitude });

  const pointGraphic = new Graphic({
    geometry: point,
    symbol,
  });

  view.graphics.add(pointGraphic);
  return pointGraphic;
};

export const mapLoaded = (view: MapView): Promise<void> => {
  return view.when(() => {
    console.info("Map is loaded");
  });
};
