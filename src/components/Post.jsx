import React, { useState } from "react";

export default function Post({ post }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const selectedPhoto =
    (Array.isArray(post?.photos)
      ? post.photos[selectedPhotoIndex]
      : post?.photo) || null;

  console.log("Post User Data:", post.user);
  const fullName = post.user?.name || "Unknown user";

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="w-full lg:w-1/2">
        <div className="rounded-2xl overflow-hidden">
          <img
            src={selectedPhoto}
            alt={post.title}
            className="w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        {post.photos?.length > 1 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
            {post.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${post.title} - ${index + 1}`}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`w-full h-20 object-cover rounded-lg cursor-pointer border ${
                  photo === selectedPhoto
                    ? "border-primary border-2"
                    : "border-gray"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <h2 className="text-4xl font-extrabold font-montserrat text-primary mb-2">
          {post.title}
        </h2>
        <p className="text-base text-gray mb-6">{post.category}</p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Details:</h3>
          <p>{post.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Address to meet:</h3>
          <p>{post.zip}</p>
          <div className="w-full h-52 bg-gray-light rounded-xl flex items-center justify-center text-gray text-sm mt-4">
            Map will be displayed here
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Giver Information:</h3>

          <div className="flex items-center gap-3 mb-2">
            <img
              src={post.user?.avatar_url || "/icons/avatar.svg"}
              alt={fullName}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span>{fullName}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src="/icons/email.svg" alt="Email" className="w-5 h-5" />
            <span>
              {post.user?.email || post.user_email || "No email provided"}
            </span>
          </div>

          {post.canDeliver && (
            <div className="flex items-center gap-2 mt-2">
              <img
                src="/icons/delivery.svg"
                alt="Can deliver"
                className="w-5 h-5"
              />
              <span>Can deliver</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
