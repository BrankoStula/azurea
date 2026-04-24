// components/ui/MapboxMap.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import { MapPin, Waves, Coffee, Utensils, Wind, Plane } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

// ─── Shared types (imported by LocationSection) ────────────────────────────

export type POIType = "project" | "beach" | "cafe" | "restaurant" | "surf" | "airport";

export type POI = {
  label: string;
  longitude: number;
  latitude: number;
  type: POIType;
};

export type Camera = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

type Props = {
  camera: Camera;
  pois: POI[];
  route?: [number, number][];
};

// ─── Constants ─────────────────────────────────────────────────────────────

// ✅ Safely pulling the token from environment variables
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

// ─── Marker style map ──────────────────────────────────────────────────────

type MarkerStyle = {
  Icon: typeof MapPin;
  bg: string;
  color: string;
  iconSize: number;
  diameter: string;
  ring: boolean;
};

const MARKER: Record<POIType, MarkerStyle> = {
  project:    { Icon: MapPin,   bg: "#08204D", color: "#C9A55A", iconSize: 18, diameter: "2.75rem", ring: true  },
  beach:      { Icon: Waves,    bg: "rgba(255,255,255,0.95)", color: "#08204D", iconSize: 14, diameter: "2rem", ring: false },
  cafe:       { Icon: Coffee,   bg: "rgba(255,255,255,0.95)", color: "#08204D", iconSize: 14, diameter: "2rem", ring: false },
  restaurant: { Icon: Utensils, bg: "rgba(255,255,255,0.95)", color: "#08204D", iconSize: 14, diameter: "2rem", ring: false },
  surf:       { Icon: Wind,     bg: "rgba(255,255,255,0.95)", color: "#08204D", iconSize: 14, diameter: "2rem", ring: false },
  airport:    { Icon: Plane,    bg: "#C9A55A", color: "#08204D", iconSize: 16, diameter: "2.5rem", ring: true  },
};

// ─── Component ─────────────────────────────────────────────────────────────

const routeGeoJSON = (coords: [number, number][]) => ({
  type: "Feature" as const,
  properties: {},
  geometry: { type: "LineString" as const, coordinates: coords },
});

export default function MapboxMap({ camera, pois, route }: Props) {
  const mapRef       = useRef<MapRef | null>(null);
  const [loaded, setLoaded] = useState(false);
  const skipFirst    = useRef(true);

  // Fly to new camera whenever the `camera` prop changes.
  useEffect(() => {
    if (!loaded) return;
    if (skipFirst.current) { skipFirst.current = false; return; }
    mapRef.current?.flyTo({
      center:   [camera.longitude, camera.latitude],
      zoom:     camera.zoom,
      pitch:    camera.pitch,
      bearing:  camera.bearing,
      duration: 2200,
      essential: true,
    });
  }, [camera.longitude, camera.latitude, camera.zoom, camera.pitch, camera.bearing, loaded]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: camera.longitude,
        latitude:  camera.latitude,
        zoom:      camera.zoom,
        pitch:     camera.pitch,
        bearing:   camera.bearing,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      scrollZoom={false}
      dragPan
      attributionControl={false}
      onLoad={() => setLoaded(true)}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      {/* Route line */}
      {route && loaded && (
        <Source id="route-source" type="geojson" data={routeGeoJSON(route)}>
          <Layer
            id="route-shadow"
            type="line"
            paint={{ "line-color": "#000000", "line-width": 8, "line-opacity": 0.12, "line-blur": 6 }}
            layout={{ "line-join": "round", "line-cap": "round" }}
          />
          <Layer
            id="route-line"
            type="line"
            paint={{ "line-color": "#C9A55A", "line-width": 3.5, "line-opacity": 0.9 }}
            layout={{ "line-join": "round", "line-cap": "round" }}
          />
        </Source>
      )}

      {/* Render markers ONLY after onLoad */}
      {loaded && pois.map((poi, i) => {
        const s = MARKER[poi.type];
        const Icon = s.Icon;
        return (
          <Marker
            key={`${poi.label}-${i}`}
            longitude={poi.longitude}
            latitude={poi.latitude}
            anchor="center"
          >
            <div
              title={poi.label}
              style={{ backgroundColor: s.bg, width: s.diameter, height: s.diameter }}
              className={[
                "flex items-center justify-center rounded-full cursor-default select-none",
                "transition-transform duration-200 hover:scale-110 shadow-md",
                s.ring ? "ring-2 ring-[#C9A55A]/50 shadow-[#C9A55A]/20 shadow-lg" : "",
              ].join(" ")}
            >
              <Icon size={s.iconSize} color={s.color} strokeWidth={1.5} />
            </div>
          </Marker>
        );
      })}
    </Map>
  );
}