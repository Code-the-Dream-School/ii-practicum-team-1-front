import React, { useEffect, useState } from "react";
import { getCoordinatesByZip } from "../util/geocode";

export default function PostCard({ post, onClick }) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if ((!post.city || !post.state_code) && post.zip) {
      getCoordinatesByZip(post.zip)
        .then((data) => setCoords(data))
        .catch((err) => console.error("Geocode error", err));
    }
  }, [post.zip, post.city, post.state_code]);

  const image =
    Array.isArray(post.images) && post.images.length > 0
      ? post.images[0].image_url
      : "/images/placeholder.png";

  return (
    <div onClick={onClick}>
      <div
        className={`
          rounded-2xl overflow-hidden border transition-all
          border-dark shadow-[0_5px_0_0_#191A23]
          hover:border-secondary hover:shadow-[0_5px_0_0_#B9FF66]
        `}
      >
        <img
          src={image}
          alt={post.title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="mt-2 px-1">
        <h4 className="text-base font-semibold text-dark">{post.title}</h4>
        <p className="text-sm text-gray">
          {(post.city && post.state_code)
            ? `${post.city}, ${post.state_code} ${post.zip}`
            : coords
              ? `${coords.city}, ${coords.state_code} ${post.zip}`
              : post.zip || "Unknown"}
        </p>
      </div>
    </div>
  );
}
