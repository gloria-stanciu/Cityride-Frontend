import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { Map } from "maplibre-gl";
import { useState } from "react";
import { GetAllStops } from "../api/getAllStops";
import { Stop } from "../api/interfaces";
import { useSelector } from "react-redux";

import "../css/MapComp.css";
import { ToggleState } from "../store/filters";
import { routeDetailsState } from "../store/routeDetails";
import { getShapePoints } from "../api/getShapePoints";

function MapComp() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(21.2087);
  const [lat, setLat] = useState(45.74);
  const [zoom, setZoom] = useState(15);
  const [map, setMap] = useState<Map>();
  const [markers, setMarkers] = useState<maplibregl.Marker[]>([]);

  const selectedType = useSelector<ToggleState, ToggleState["transportType"]>(
    (state) => state.transportType
  );

  const routeDetails = useSelector<any, routeDetailsState>(
    (state) => state.routeDetails
  );

  async function addStops() {
    const shapePoints: GeoJSON.Position[] = await getShapePoints(
      routeDetails.direction.shapeId
    );
    console.log(shapePoints);
    if (!map) return;
    // map.on("sourcedataloading", function () {
    // map.addSource("route", {
    //   type: "geojson",
    //   data: {
    //     type: "Feature",
    //     properties: {
    //       title: "Mapbox DC",
    //       "marker-symbol": "monument",
    //     },
    //     geometry: {
    //       type: "LineString",
    //       coordinates: shapePoints,
    //     },
    //   },
    // });
    // map.addLayer({
    //   id: "route",
    //   type: "line",
    //   source: "route",
    //   layout: {
    //     "line-join": "round",
    //     "line-cap": "round",
    //   },
    //   paint: {
    //     "line-color": "#bbb",
    //     "line-width": 8,
    //   },
    // });
    // });

    if (!map) return;

    let markers: maplibregl.Marker[] = routeDetails.direction.stops.map(
      (stop) => {
        let popup = new maplibregl.Popup({ offset: 25 }).setText(stop.name);

        let marker = new maplibregl.Marker()
          .setLngLat([parseFloat(stop.long), parseFloat(stop.lat)])
          .setPopup(popup);

        return marker;
      }
    );

    setMarkers(markers);

    markers.forEach((marker) => marker.addTo(map));
  }

  function removeStops() {
    markers.forEach((marker) => marker.remove());
    if (!map) return;
    map.removeSource("route");
  }

  useEffect(() => {
    loadMap();
    if (!map) return;
    return () => map.remove();
  }, []);

  function loadMap() {
    if (!mapContainer.current) return;
    const map = new Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=VLT1LWoAFXVTjShlS5Y4",
      center: [lng, lat],
      zoom: zoom,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    setMap(map);
  }

  useEffect(() => {
    // console.log({ selectedType });
    // removeStops();
    routeDetails.routeId !== "" ? addStops() : removeStops();
  }, [routeDetails]);
  return <div className="map" ref={mapContainer} />;
}

export default MapComp;
