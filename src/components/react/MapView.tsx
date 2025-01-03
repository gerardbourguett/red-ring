import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapView = ({ lat = 0, lng = 0 }) => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ2VyYXJkYm91cmd1ZXR0IiwiYSI6ImNtNTZ3emZxbDNqeHoycXE2dWFyYmYyeXYifQ.pwHT8EVzcl6ImooofWgmcw";

    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/navigation-day-v1",
        center: [lng, lat],
        zoom: 7,
        attributionControl: false,
        logoPosition: "bottom-right",
        dragPan: false,
        interactive: false,
      });

      if (map.current) {
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lng]);

  return <div ref={mapContainer} className="h-48 w-full rounded-xl " />;
};

export default MapView;
