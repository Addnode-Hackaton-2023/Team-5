import ArcGISMap from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";


  export const map = new ArcGISMap({
  basemap: "streets-vector",
});

export const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [18.0686,59.3293 ],
  zoom: 12
});

export const initialize = () => 
{
  let newMap = map;
  let newView = view;
}

export const updateMarker = (id : number) => 
{

}

export const addMarker = (id : number, longitude : number, latitude : number) => 
{

}

export const succeeded = view.when(() => {
  console.log("Map is loaded");
})

