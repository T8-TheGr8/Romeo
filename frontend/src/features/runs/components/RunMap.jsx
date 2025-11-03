import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "../styles/RunMap.css";

const startIcon = L.divIcon({
  className: "start-marker",
  html: '<div class="dot start-dot"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const finishIcon = L.divIcon({
  className: "finish-marker",
  html: '<div class="dot finish-dot"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

function FitMapBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route && route.length > 1) {
      const bounds = route.map((p) => [p.lat, p.lon]);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [route, map]);

  return null;
}

export default function RunMap({ route }) {
  if (!route || route.length === 0) {
    return <div>No GPS data</div>;
  }

  const positions = route.map((p) => [p.lat, p.lon]);
  const center = positions[0];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitMapBounds route={route} />

      <Polyline positions={positions} color="var(--accent-secondary)" weight={4} />

      <Marker position={positions[0]} icon={startIcon} />
      <Marker position={positions[positions.length - 1]} icon={finishIcon} />
    </MapContainer>
  );
}
