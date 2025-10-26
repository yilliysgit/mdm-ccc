// src/app/components/kaart/RallyMapLeaflet.tsx
"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
  Popup,          // ← deze erbij
  useMap,
} from "react-leaflet";

import * as L from "leaflet";
import type { LatLngBoundsExpression, LatLngTuple } from "leaflet";

// Fix voor marker-icons in Next
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
  className: "drop-shadow-md", // subtiele schaduw
});


type WP = { name: string; pos: LatLngTuple };

const WAYPOINTS: WP[] = [
  { name: "Dakhla", pos: [23.684, -15.957], description: "Startpunt van de rally, gelegen aan de Atlantische kust van de Westelijke Sahara." },
  { name: "Guerguerat", pos: [21.333, -16.973], description: "Grensovergang tussen Marokko en Mauritanië, waar de deelnemers bivakkeren." },
  { name: "Nouakchott", pos: [18.079, -15.965], description: "Hoofdstad van Mauritanië, ontvangst door de lokale Classic Car Club." },
  { name: "Dakar", pos: [14.716, -17.467], description: "Aankomst en afsluiting van de rally met een feestelijke ceremonie." },
];

const ROUTE: LatLngTuple[] = WAYPOINTS.map((w) => w.pos);

function FitToRoute({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, bounds]);
  return null;
}

export default function RallyMapLeaflet() {
  const bounds = useMemo(() => L.latLngBounds(ROUTE), []);
  return (
    <div className="w-full h-[560px] rounded-2xl overflow-hidden shadow-xl">
      <MapContainer className="w-full h-full" scrollWheelZoom={false}>
       
  <TileLayer
  attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
  url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
  maxZoom={18}
/>


        <FitToRoute bounds={bounds} />
 <Polyline
  positions={ROUTE}
  pathOptions={{
    color: "#c9a34f", // goudkleurig zoals je logo
    weight: 6,
    opacity: 0.95,
    dashArray: "10 6",
  }}
/>
        {WAYPOINTS.map((w) => (
  <Marker key={w.name} position={w.pos} icon={icon}>
    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
      <strong>{w.name}</strong>
    </Tooltip>
    <Popup>
  <div
    className="text-sm leading-snug"
    style={{
      color: "#243b2e", // donkergroen tekst
    }}
  >
    <h3
      className="font-semibold mb-1"
      style={{ color: "#c9a34f" }} // goudkleurig titel
    >
      {w.name}
    </h3>
    <p>{w.description || "Klikpunt van de rally — meer info over deze etappe volgt."}</p>
  </div>
</Popup>

  </Marker>
))}

      </MapContainer>
    </div>
  );
}
