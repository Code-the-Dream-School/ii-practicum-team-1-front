import React, { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import PostCard from "../components/PostCard";

const PostList = () => {
  const {
    filteredPosts: posts,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
  } = usePosts();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) return <p className="text-center py-8">Loading posts...</p>;
  if (error)
    return <p className="text-red-500 text-center py-8">Error: {error}</p>;
  
  return (
    <div className="max-w-[1440px] mx-auto px-2 py-10 flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords or ZIP code..."
            className="w-full pl-10 pr-10 py-2 border border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray py-8">
          No posts found for "<strong>{searchQuery}</strong>". Try adjusting
          your search or filters.
        </p>
      ) : (
        <>
          <p className="text-sm text-gray mb-4">
            Showing {posts.length} result{posts.length !== 1 && "s"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post) => (
              <PostCard
                key={post.item_id}
                post={post}
                onClick={() =>
                  navigate(`/app/posts/${post.item_id}`, {
                    state: { backgroundLocation: location },
                  })
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
