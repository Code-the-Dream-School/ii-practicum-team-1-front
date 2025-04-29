import React, { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutList, MapPin } from "lucide-react";
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
  const [viewMode, setViewMode] = useState("list"); // Добавили состояние для активной кнопки

  if (isLoading) return <p className="text-center py-8">Loading posts...</p>;
  if (error)
    return <p className="text-red-500 text-center py-8">Error: {error}</p>;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:pl-72 py-10 flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex-1 w-full relative">
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

        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 transition ${
              viewMode === "list" ? "text-dark" : "text-gray"
            } hover:text-primary`}
          >
            <LayoutList size={20} />
            <span className="text-base font-montserrat">As list</span>
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-2 transition ${
              viewMode === "map" ? "text-dark" : "text-gray"
            } hover:text-primary`}
          >
            <MapPin size={20} />
            <span className="text-base font-montserrat">On map</span>
          </button>
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="text-center text-gray py-20 text-lg font-montserrat">
          Map view coming soon
        </div>
      ) : posts.length === 0 ? (
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
