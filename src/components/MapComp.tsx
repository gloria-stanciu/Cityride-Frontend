import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { Map } from "maplibre-gl";
import { useState } from "react";
import { GetAllStops } from "../api/getAllStops";
import { Position, Stop } from "../api/interfaces";
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
    showRoute(shapePoints.map((p) => p.reverse()));
  }

  function removeStops() {
    if (!map) return;

    markers.forEach((marker) => marker.remove());
    showRoute([]);
  }

  function initRoute() {
    if (!map) return;

    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [],
        },
      },
    });

    map.addLayer({
      id: "route_layer",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#3d199b",
        "line-width": 8,
      },
    });
  }

  function showRoute(points: GeoJSON.Position[]) {
    const routeSource = map?.getSource("route") as maplibregl.GeoJSONSource;

    routeSource?.setData({
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: points,
      },
    });
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
    if (!map) return;
    map.on("load", () => initRoute());
  }, [map]);

  useEffect(() => {
    // console.log({ selectedType });
    // removeStops();
    routeDetails.routeId !== "" ? addStops() : removeStops();
  }, [routeDetails]);
  return <div className="map" ref={mapContainer} />;
}

export default MapComp;
