import React from "react";

export default function PostCard({ post, onClick }) {
  const image =
    Array.isArray(post.photos) && post.photos.length > 0
      ? post.photos[0]
      : post.photo || "/images/placeholder.png";

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
          {post.city && post.state_code
            ? `${post.city}, ${post.state_code} ${post.zip}`
            : post.zip || "Unknown"}
        </p>
      </div>
    </div>
  );
}
