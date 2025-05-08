const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function registerUser(formData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}

export async function forgotPasswordRequest(email) {
  const res = await fetch(`${BASE_URL}/auth/request-password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Failed to send reset email");
  return await res.json(); 
}

export async function resetPasswordRequest(token, newPassword, email) {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword, email }),
  });
  if (!res.ok) throw new Error("Failed to reset password");
  return await res.json();
}

export async function updateUser(data, token) {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    const res = await fetch(`${BASE_URL}/users/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to update user");
    const updatedUser = await res.json();
    return updatedUser;
  } catch (err) {
    throw err;
  }
}

export const fetchPosts = async () => {
  const res = await fetch(`${BASE_URL}/items/`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
};

export const fetchPostById = async (id) => {
  const res = await fetch(`${BASE_URL}/items/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
};

// Create Post
export const createPost = async (formData) => {
  const res = await fetch(`${BASE_URL}/items/`, {
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
  const res = await fetch(`${BASE_URL}/items/${id}`, {
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
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete post");
  return await res.json();
};
