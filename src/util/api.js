export const BASE_URL = import.meta.env.VITE_API_URL;

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

export async function verifyEmailRequest({ token, email }) {
  const res = await fetch(`${BASE_URL}/auth/verify-email?token=${token}&email=${email}`);

  const contentType = res.headers.get("Content-Type");

  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Verification failed");
    return data;
  } else {
    const text = await res.text();
    throw new Error(text || "Unexpected response format");
  }
}

export async function updateUser(data, token) {
  try {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }
    const res = await fetch(`${BASE_URL}/user/info`, {
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

// Helper to normalize post item

export function normalizeItem(item) {

  if (!item) return null;
  const user = item.User || item.user || {};
  return {
    ...item,
    photos: item.images?.map((img) => img.image_url) || [],
    category: item.category_name || item.Category?.category_name || "Other",
    user: {
      name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
      email: user.email || item.user_email || "",
      avatar_url: user.avatar_url || "",
    },
  };
}
export async function getFilteredPosts(category, search) {
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/items?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  return data.items.map(normalizeItem);
}
export async function getPostById(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/items/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  console.log(data.item);
  if (!res.ok) throw new Error(data.error || "Failed to fetch post");

  const item = data.item;

  return {
    ...item,
    photos: item.images?.map((img) => img.image_url) || [],
    category: item.category_name || item.Category?.category_name || "Other",
    user: {
      first_name: item.user?.first_name || "",
      last_name: item.user?.last_name || "",
      name: `${item.user?.first_name || ""} ${
        item.user?.last_name || ""
      }`.trim(),
      email: item.user?.email || item.user_email || "No email provided",
      avatar_url: item.user?.avatar_url || "",
    },
  };
}

export const createPost = async (formData, token) => {
  const res = await fetch(`${BASE_URL}/items/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create post");
  const json = await res.json();
  return json.item;
};

export const updatePost = async (id, formData, token) => {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update post");
  return await res.json();
};
// Delete Post
export const deletePost = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch post");

  return normalizeItem(data.item);
};

export async function getPaginatedPosts({ page = 1, limit = 12, search = "", category = "" }) {
  const params = new URLSearchParams();
  params.append("offset", (page - 1) * limit);
  params.append("limit", limit);
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/items?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch posts");

  const data = await res.json();
  return {
    posts: data.items.map(normalizeItem),
    totalPages: data.pagination.total_pages,
    currentPage: data.pagination.current_page,
  };
}
export function createApiWithLogout(logout) {
  return async function fetchWith401Check(url, options = {}) {
    const res = await fetch(url, options);
    if (res.status === 401) {
      logout();
      return;
    }
    return res;
  };
}

export async function getUserPosts(token) {
  const response = await fetch(`${BASE_URL}/items?self=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }

  const data = await response.json();
  return data.items.map(normalizeItem);
}