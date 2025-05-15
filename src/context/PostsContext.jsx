import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";

import {
  getFilteredPosts,
  getPostById,
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
  getPaginatedPosts,
} from "../util/api";

import { useAuth } from "./AuthContext";
import { BASE_URL, normalizeItem } from "../util/api";

const PostsContext = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [error, setError] = useState(null);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { fetchWith401Check, token } = useAuth();

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);
  

      const category = activeCategories[0] || "";

      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (searchQuery) params.append("search", searchQuery);

      params.append("offset", (page-1) * 12);
      params.append("limit", 12);
      
      const res = await fetchWith401Check(
        `${BASE_URL}/items?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res) return;
      
      const data = await res.json();
      setPosts(data.items.map(normalizeItem));
      setTotalPages(data.pagination?.total_pages || 1);
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  }
  
  const getPost = useCallback(
    async (id) => {
        try {
        setIsLoading(true);
        setError(null);
        const res = await fetchWith401Check(`${BASE_URL}/items/${id}`, {
          headers: {


            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res) return;
        const data = await res.json();
        setCurrentPost(normalizeItem(data.item));
      } catch (err) {
        setError(err.message || "Failed to fetch post");
      } finally {
        setIsLoading(false);
      }
    },
    [fetchWith401Check, token]
  );

  async function updatePost(id, formData) {
    return await apiUpdatePost(id, formData, token);
  }

  async function createPost(formData) {
    return await apiCreatePost(formData, token);
  }

  async function deletePost(id) {
    return await apiDeletePost(id, token);
  }

  return (
    <PostsContext.Provider
      value={{
        posts,
        activeCategories,
        setActiveCategories,
        isLoading,
        currentPost,
        error,
        getPost,
        updatePost,
        deletePost,
        createPost,
        searchQuery,
        setSearchQuery,
        fetchPosts,
        page,
        setPage,
        totalPages,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
export { PostsProvider, usePosts };
