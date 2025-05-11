import React, { useEffect, useState } from "react";
import { getCityStateByZip } from "../util/zipcodeLookup";

export default function PostCard({ post, onClick }) {
  const image = Array.isArray(post.photos) ? post.photos[0] : post.photo;
  const [cityState, setCityState] = useState("");

  useEffect(() => {
    if (post.location) {
      getCityStateByZip(post.location)
        .then((label) => setCityState(label || ""))
        .catch((err) => {
          console.error("City/State error:", err);
          setCityState("");
        });
    }
  }, [post.location]);

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
          src={image || "/images/placeholder.png"}
          alt={post.title}
          className="w-full aspect-square object-cover"
        />
      </div>
      <div className="mt-2 px-1">
        <h4 className="text-base font-semibold text-dark">{post.title}</h4>
        <p className="text-sm text-gray">{post.zip || "Unknown"}</p>
      </div>
    </div>
  );
}
