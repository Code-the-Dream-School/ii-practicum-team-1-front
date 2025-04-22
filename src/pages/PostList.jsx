import React from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useLocation } from "react-router-dom";

const PostList = () => {
 const { filteredPosts: posts, isLoading, error } = usePosts();
 const navigate = useNavigate();
 const location = useLocation();

 if (isLoading) return <p className="text-center py-8">Loading posts...</p>;
 if (error) return <p className="text-red-500 text-center py-8">Error: {error}</p>;
 if (posts.length === 0) return <p className="text-center py-8">No posts available.</p>;

 return (
    <div className="px-2 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post.item_id}
            onClick={() =>
              navigate(`/app/posts/${post.item_id}`, {
                state: { backgroundLocation: location },
              })
            }
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4"
          >
            <div className="aspect-square bg-gray-100 overflow-hidden rounded-md mb-4">
              <img
                src={Array.isArray(post.photos) ? post.photos[0] : post.photo}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <h2 className="text-sm font-semibold text-gray-800 mb-1">
              {post.title}
            </h2>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Location:</strong> {post.location}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Category:</strong> {post.category}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Status:</strong> {post.status}
            </p>
            <p className="text-xs text-gray-600 line-clamp-2">
              {post.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;