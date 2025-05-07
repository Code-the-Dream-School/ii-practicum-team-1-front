import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import {
  createPost as apiCreatePost,
  updatePost as apiUpdatePost,
  deletePost as apiDeletePost,
} from "../util/api";

import { fetchPosts as apiFetchPosts, fetchPostById } from "../util/api";

const PostsContext = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [error, setError] = useState(null);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await apiFetchPosts();
      setPosts(data);

      // TODO: When API is ready, fetch filtered posts directly:
      /*
      const queryParams = new URLSearchParams();
      if (searchQuery) queryParams.append("q", searchQuery);
      activeCategories.forEach((cat) => queryParams.append("category", cat));

      const res = await fetch(`/api/posts?${queryParams.toString()}`);
      const data = await res.json();
      setPosts(data);
      */
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.some((category) =>
          Array.isArray(post.category)
            ? post.category.some((c) => c === category)
            : category === post.category
        );

      const text = [post.title, post.description, post.location, post.zip]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = text.includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategories, searchQuery]);

  async function getPost(id) {
    try {
      setIsLoading(true);
      setError(null);
      const post = await fetchPostById(id);
      if (!post || typeof post !== "object") throw new Error("Post not found");
      setCurrentPost(post);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PostsContext.Provider
      value={{
        filteredPosts,
        activeCategories,
        setActiveCategories,
        posts,
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
