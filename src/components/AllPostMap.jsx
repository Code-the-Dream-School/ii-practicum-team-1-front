import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate, useLocation } from "react-router-dom";

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function groupPostsByLocation(posts) {
  const groups = {};
  posts.forEach((post) => {
    if (!post.lat || !post.lng) return;
    const key = `${post.lat},${post.lng}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(post);
  });
  return groups;
}

export default function AllPostMap({ posts, setViewType }) {
  const navigate = useNavigate();
  const location = useLocation();

  const groupedPosts = groupPostsByLocation(posts);
  const groupKeys = Object.keys(groupedPosts);

  if (groupKeys.length === 0) {
    return (
      <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          attribution="&copy; Stadia Maps"
        />
      </MapContainer>
    );
  }

  const [lat, lng] = groupKeys[0].split(",").map(Number);

  return (
    <MapContainer center={[lat, lng]} zoom={5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        attribution="&copy; Stadia Maps"
      />
      {groupKeys.map((key) => {
        const [lat, lng] = key.split(",").map(Number);
        const postsAtLocation = groupedPosts[key];

        return (
          <Marker key={key} position={[lat, lng]} icon={greenIcon}>
            <Popup>
              {postsAtLocation.length === 1 ? (
                <button
                  onClick={() => navigate(`/app/posts/${postsAtLocation[0].item_id}`, {
                    state: { backgroundLocation: location },
                  })}
                  className="text-primary underline"
                >
                  {postsAtLocation[0].title}
                </button>
              ) : (
                <div>
                  <strong>{postsAtLocation.length} items:</strong>
                  <ul>
                    {postsAtLocation.map((p) => (
                      <li key={p.item_id}>
                        <button
                          onClick={() => navigate(`/app/posts/${p.item_id}`, {
                            state: { backgroundLocation: location },
                          })}
                          className="text-primary underline"
                        >
                          {p.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
