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

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch posts");

  return data.items.map((item) => ({
    ...item,
    photos: item.images?.map((img) => img.image_url) || [],
    category: item.category_name || item.Category?.category_name || "Other",
    user: {
      name: `${item.User?.first_name || ""} ${
        item.User?.last_name || ""
      }`.trim(),
      email: item.User?.email || "",
      avatar: item.User?.avatar_url || "",
    },
  }));
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
      avatar: item.user?.avatar_url || "",
    },
  };
}
