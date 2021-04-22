import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { Map } from "maplibre-gl";
import { useState } from "react";
import {GetAllStops} from '../api/getAllStops'
import { Stop } from '../api/interfaces'

import "../css/MapComp.css";

function MapComp() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [lng, setLng] = useState(21.2087);
  const [lat, setLat] = useState(45.74);
  const [zoom, setZoom] = useState(15);
  const [map, setMap] = useState<Map>();

  function loadMap() {
    if (!mapContainer.current) return;
    setMap(
      new Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/streets/style.json?key=VLT1LWoAFXVTjShlS5Y4",
        center: [lng, lat],
        zoom: zoom,
        // transformRequest: (url, resourceType)=> {
        //   if(resourceType === 'Source' && url.startsWith('http://myHost')) {
        //     return {
        //      url: url.replace('http', 'https'),
        //      headers: { 'my-custom-header': true},
        //      credentials: 'include'  // Include cookies for cross-origin requests
        //    }
        //   }
        // }
      })
    )
  }

  function navigation() {
    if (!map) return;
    map.addControl(new maplibregl.NavigationControl(), "top-right");
  }

  function getUserLocation() {
    if (!map) return;
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }

  async function addAllStopsToMap() {
    const stops:Stop[] = await GetAllStops();
    if (!map) return;
    stops.map((stop) => {
      if (!stop.name) return;
      let popup = new maplibregl.Popup({ offset: 25 }).setText(stop.name);        
      new maplibregl.Marker()
        .setLngLat([parseFloat(stop.long), parseFloat(stop.lat)])
        .setPopup(popup)
        .addTo(map);
    })
  }

  useEffect(() => {
    loadMap();
    if (!map) return;
    return () => map.remove();
  }, []);
  navigation()
  getUserLocation();
  addAllStopsToMap()
  return (
    <div className="map" ref={mapContainer}/>
  );
}

export default MapComp;
