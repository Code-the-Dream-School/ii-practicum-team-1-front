import React, { useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import PostCard from "../components/PostCard";

const PostList = () => {
  const { posts, isLoading, error, setSearchQuery, page, setPage, totalPages } =
    usePosts();

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(inputValue.trim());
  };

  return (
    <div className="max-w-[1440px] mx-auto px-2 py-5 flex flex-col">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div className="flex-1 w-full relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search by keywords or ZIP code..."
            className="w-full pl-4 pr-10 py-2 border border-gray rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => {
                setInputValue("");
                setSearchQuery("");
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray text-sm"
            >
              ✕
            </button>
          )}
          <Search
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
          />
        </div>
      </form>

      {isLoading ? (
        <p className="text-center py-8">Loading posts...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-8">Error: {error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray py-8">
          No posts found. Try another search.
        </p>
      ) : (
        <>
          <p className="text-sm text-gray mb-4">
            Showing {posts.length} result{posts.length !== 1 && "s"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.isArray(posts) &&
              posts.map((post) => (
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
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-dark text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-dark text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
