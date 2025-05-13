import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { getFilteredPosts, getPostById, getPaginatedPosts } from "../util/api";

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

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);

      const category = activeCategories[0] || "";
      const { posts, totalPages: total } = await getPaginatedPosts({
        page,
        limit: 12,
        search: searchQuery,
        category,
      });
      setPosts(posts);
      setTotalPages(total);
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [activeCategories, searchQuery, page]);

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
