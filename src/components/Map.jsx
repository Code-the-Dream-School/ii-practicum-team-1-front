// Map.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';

import styles from './Map.module.css';
import { usePosts } from '../context/PostsContext';
import { useGeolocation } from '../components/hooks/useGeolocation';
import { useUrlPosition } from '../components/hooks/useUrlPosition';
import Button from './Button';
import { enrichPostsWithCoordinates } from '../util/enrichPostsWithCoordinates';

function Map() {
  const { posts } = usePosts();
  const [mapPosition, setMapPosition] = useState([40, -108]);
//   console.log("Maps posts", posts);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  const enrichedPosts = enrichPostsWithCoordinates(posts);
  console.log(enrichedPosts);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="button" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {enrichedPosts.map((post) => (
          <Marker
            position={[post.position.lat, post.position.lng]}
            key={post._id}>
            <Popup>
              <span>{post.title}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) =>
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;