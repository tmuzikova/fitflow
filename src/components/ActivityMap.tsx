import React from "react";
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";
import polyline from "@mapbox/polyline";

const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

interface ActivityMapProps {
  polyline: string | null;
}

export const ActivityMap: React.FC<ActivityMapProps> = ({
  polyline: encodedPolyline,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey,
  });

  if (!isLoaded) return <div>Loading...</div>;
  if (!encodedPolyline) return <div>No map data available</div>;

  // Decode the polyline
  const path = polyline
    .decode(encodedPolyline)
    .map(([lat, lng]) => ({ lat, lng }));

  console.log("Decoded path:", path);

  return (
    <GoogleMap
      mapContainerStyle={{
        height: "300px",
        width: "100%",
        position: "relative",
      }}
      zoom={14}
      center={path[0]} // Center map on the first point in the polyline
    >
      <Polyline
        path={path}
        options={{
          strokeColor: "000000",
          strokeOpacity: 1,
          strokeWeight: 200,
        }}
      />
    </GoogleMap>
  );
};
