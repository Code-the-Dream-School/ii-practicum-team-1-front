import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { useAuth } from "../context/AuthContext";
import { BASE_URL, normalizeItem } from "../util/api";

const PostsContext = createContext();

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [error, setError] = useState(null);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchWith401Check, token } = useAuth();

  async function fetchPosts() {
    try {
      setIsLoading(true);
      setError(null);

      const category = activeCategories[0] || "";
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (searchQuery) params.append("search", searchQuery);

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
      setPosts(data.items || []);
    } catch (err) {
      setError(err.message || "Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [activeCategories, searchQuery]);

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
  // TODO: Replace with real API call after PR is merged
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
