
import React, { useState, useEffect } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, List as ListIcon, MapPin } from "lucide-react";
import PostCard from "../components/PostCard";
import AllPostMap from "../components/AllPostMap";
import { getCoordinatesByZipCodes } from "../util/geocode";

const PostList = () => {
  const {
    posts,
    isLoading,
    error,
    setSearchQuery,
    fetchPosts,
    activeCategories,
    searchQuery,
    page,
    setPage,
    totalPages,
  } = usePosts();

  const [inputValue, setInputValue] = useState("");
  const [viewType, setViewType] = useState("list");
  const [postsWithCoords, setPostsWithCoords] = useState(posts);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Fetching posts with params:", { activeCategories, searchQuery, page });
    setPostsWithCoords([]); 
    fetchPosts();
  }, [activeCategories, searchQuery, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(inputValue.trim());
  };

  useEffect(() => {
    console.log("Posts updated:", posts);

    const enrichPosts = async () => {
      const zipcodes = posts.map((post) => post.zip).filter(Boolean).join(",");
      if (!zipcodes) {
        setPostsWithCoords(posts);
        return;
      }

      try {
        const locations = await getCoordinatesByZipCodes(zipcodes);
        const updatedPosts = posts.map((post) => {
          const location = locations[post.zip];
          return location ? { ...post, ...location } : post;
        });
        setPostsWithCoords(updatedPosts);
      } catch (error) {
        console.error("Geocoding error:", error);
        setPostsWithCoords(posts);
      }
    };

    if (posts.length > 0) {
      enrichPosts();
    }
  }, [posts]);

  const postsWithValidCoords = postsWithCoords.filter(post => post.lat && post.lng);

  console.log("Rendering postsWithCoords:", postsWithCoords);

  return (
    <div className="max-w-[1440px] mx-auto px-2 py-5 flex flex-col">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex-1 relative">
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
          <Search onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
        </div>

        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            type="button"
            onClick={() => setViewType("list")}
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-1 ${viewType === "list" ? "bg-primary text-black" : "bg-gray-light text-gray"}`}
          >
            <ListIcon size={18} />
            List
          </button>
          <button
            type="button"
            onClick={() => setViewType("map")}
            className={`px-4 py-2 rounded-xl text-sm border flex items-center gap-1 ${viewType === "map" ? "bg-primary text-black" : "bg-white text-gray border-gray-light"}`}
          >
            <MapPin size={18} />
            Map
          </button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-center py-8">Loading posts...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-8">Error: {error}</p>
      ) : postsWithCoords.length === 0 && searchQuery !== "" ? (
        <p className="text-center text-gray py-8">No posts found. Try another search.</p>
      ) : (
        <>
          {viewType === "list" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {postsWithCoords.map((post) => (
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

              <div className="flex justify-center items-center gap-6 mt-10 font-montserrat text-sm text-dark">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="min-w-[120px] px-4 py-2 border border-dark rounded-xl hover:border-secondary transition disabled:opacity-40">
                  Previous
                </button>
                <span className="whitespace-nowrap">Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="min-w-[120px] px-4 py-2 border border-dark rounded-xl hover:border-secondary transition disabled:opacity-40">
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="h-[500px] md:h-[700px] w-full relative z-0">
              <AllPostMap posts={postsWithValidCoords} setViewType={setViewType} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
