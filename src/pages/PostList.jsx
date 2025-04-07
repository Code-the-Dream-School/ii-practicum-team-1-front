import React from "react";
import { usePosts } from "../context/PostsContext";


const PostList = () => {
 const { filteredPosts: posts, isLoading, error } = usePosts();


 if (isLoading) return <p className="text-center py-8">Loading posts...</p>;
 if (error) return <p className="text-red-500 text-center py-8">Error: {error}</p>;
 if (posts.length === 0) return <p className="text-center py-8">No posts available.</p>;


 return (
  <div className="px-2 py-4">
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-5">
      {posts.map((post) => (
        <div
          key={post.item_id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
          {/* Photo Section */}
          <div className="aspect-square bg-gray-100">
            <img
              src={Array.isArray(post.photos) ? post.photos[0] : post.photo}
              alt={post.title}
              className="w-full h-full object-cover rounded-t-lg"
              loading="lazy"
            />
          </div>

          {/* Info Section */}
          <div className="p-2">
            <h2 className="text-xs font-semibold text-gray-800 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-[10px] text-gray-500">{post.location}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default PostList;