import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { Map } from "maplibre-gl";
import { useState } from "react";
import { GetAllStops } from "../api/getAllStops";
import { Stop } from "../api/interfaces";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import "../css/MapComp.css";
import { ToggleState } from "../store/filters";
// import { toggle } from "../actions";

function MapComp() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(21.2087);
  const [lat, setLat] = useState(45.74);
  const [zoom, setZoom] = useState(15);
  const [map, setMap] = useState<Map>();
  const [markers, setMarkers] = useState<maplibregl.Marker[]>([]);

  const isClicked = useSelector<ToggleState, ToggleState["isClicked"]>(
    (state) => state.isClicked
  );

  // const dispatch = useDispatch();

  // const onClickButton = (isClicked: boolean) => {
  //   dispatch(toggle(isClicked));
  // };

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

  function getUserLocation() {
    if (!map) return;
  }

  async function addStops() {
    const stops: Stop[] = await GetAllStops();

    if (!map) return;

    let markers: maplibregl.Marker[] = stops.map((stop) => {
      let popup = new maplibregl.Popup({ offset: 25 }).setText(stop.name);

      let marker = new maplibregl.Marker()
        .setLngLat([parseFloat(stop.long), parseFloat(stop.lat)])
        .setPopup(popup);

      return marker;
    });

    setMarkers(markers);

    markers.forEach((marker) => marker.addTo(map));
  }

  function removeStops() {
    markers.forEach((marker) => marker.remove());
  }

  useEffect(() => {
    loadMap();
    if (!map) return;
    return () => map.remove();
  }, []);

  useEffect(() => {
    isClicked ? addStops() : removeStops();
  }, [isClicked]);
  return <div className="map" ref={mapContainer} />;
}

export default MapComp;
