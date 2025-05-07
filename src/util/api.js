const API_URL = import.meta.env.VITE_API_URL;

export const fetchPosts = async () => {
    const res = await fetch(`${API_URL}/items/`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return await res.json();
  };
  
  export const fetchPostById = async (id) => {
    const res = await fetch(`${API_URL}/items/${id}`);
    if (!res.ok) throw new Error("Failed to fetch post");
    return await res.json();
  };

// Create Post
export const createPost = async (formData) => {
  const res = await fetch(`${API_URL}/items/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create post");
  return await res.json();
};

// Update Post
export const updatePost = async (id, formData) => {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to update post");
  return await res.json();
};

// Delete Post
export const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete post");
  return await res.json();
};
