import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import L from "leaflet";

interface ActivityMapProps {
  polyline: string | null;
}

export const ActivityMap: React.FC<ActivityMapProps> = ({
  polyline: encodedPolyline,
}) => {
  if (!encodedPolyline) return <div>No map data available</div>;

  const FitBoundsPolyline = ({
    positions,
  }: {
    positions: [number, number][];
  }) => {
    const map = useMap();
    useEffect(() => {
      if (positions.length > 0) {
        const bounds = L.latLngBounds(positions);
        map.fitBounds(bounds);
      }
    }, [map, positions]);

    return (
      <Polyline
        positions={positions}
        pathOptions={{ color: "#0A84FF", weight: 4, opacity: 0.5 }}
      />
    );
  };

  // decode the polyline
  const path: [number, number][] = polyline
    .decode(encodedPolyline)
    .map(([lat, lng]: [number, number]) => [lat, lng]);

  return (
    <MapContainer
      center={path[0]} // centers map on the first point of the polyline
      zoom={15}
      style={{ height: "350px", width: "400px", borderRadius: "6px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FitBoundsPolyline positions={path} />
    </MapContainer>
  );
};
