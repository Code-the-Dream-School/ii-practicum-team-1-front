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
} from "../util/api";

import { useAuth } from "./AuthContext";

const PostsContext = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [error, setError] = useState(null);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useAuth();

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);

      const category = activeCategories[0] || "";
      const data = await getFilteredPosts(category, searchQuery, token);
      setPosts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchPosts();
  }, [activeCategories, searchQuery]);

  const getPost = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const post = await getPostById(id);
      setCurrentPost(post);
    } catch (err) {
      setError(err.message || "Failed to fetch post");
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function createPost(formData) {
    return await apiCreatePost(formData, token);
  }

  async function updatePost(id, formData) {
    return await apiUpdatePost(id, formData, token);
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
