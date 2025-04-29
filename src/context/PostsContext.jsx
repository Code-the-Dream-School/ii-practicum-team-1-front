import React from "react";
import { createContext, useEffect, useState, useContext, useMemo } from "react";
import dummyItems from "../context/dummyItems.js";

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

      setPosts(dummyItems);
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
          typeof post.category === "string"
            ? post.category.toLowerCase().includes(category.toLowerCase())
            : Array.isArray(post.category)
            ? post.category.some(
                (c) => category.toLowerCase() === c.toLowerCase()
              )
            : false
        );

      const text = [post.title, post.description, post.location, post.zip]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = text.includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategories, searchQuery]);

  // console.log(posts);

  async function getPost(id) {
    try {
      setIsLoading(true);
      setError(null);
      const post = dummyItems.find((p) => p.item_id === id);
      if (!post) throw new Error("Post not found");
      setCurrentPost(post);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function updatePost(id, updatedData) {
    try {
      setIsLoading(true);
      setError(null);
      const updatedPost = {
        ...posts.find((p) => p.item_id === id),
        ...updatedData,
      };
      setPosts((posts) =>
        posts.map((post) => (post.item_id === id ? updatedPost : post))
      );
      setCurrentPost(updatedPost);
    } catch (err) {
      setError("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  }

  async function deletePost(id) {
    try {
      setIsLoading(true);
      setError(null);
      setPosts((posts) => posts.filter((post) => post.item_id !== id));
      if (currentPost.item_id === id) setCurrentPost({});
    } catch (err) {
      setError("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  }

  async function createPost(newPostData) {
    try {
      setIsLoading(true);
      setError(null);
      const newPost = { item_id: Date.now(), ...newPostData };
      setPosts((posts) => [...posts, newPost]);
    } catch (err) {
      setError("Failed to create post");
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
