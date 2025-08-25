"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

// Fix default icon issue with Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-sha.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-icon.png",
});

const LeafletMap = () => {
  // Lagos coordinates
  const position: LatLngExpression = [6.431173517675846, 3.4629119088807525];


  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <b>Veemade Unisex Salon & Spa</b>
          <br />
          Lagos, Nigeria
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
