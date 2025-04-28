import React from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useLocation } from "react-router-dom";
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
    <div className="px-2 py-4">
      <div className="mb-4 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-2 border border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray text-sm"
          >
            ✕
          </button>
        )}
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
