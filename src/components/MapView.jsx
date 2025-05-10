import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const greenIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapView({ lat, lng, itemId }) {
  return (
    <MapContainer
      key={itemId}
      center={[lat, lng]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href='https://www.stadiamaps.com/' target='_blank'>Stadia Maps</a>"
      />
      <Marker position={[lat, lng]} icon={greenIcon}>
        <Popup>Meet here</Popup>
      </Marker>
    </MapContainer>
  );
}
