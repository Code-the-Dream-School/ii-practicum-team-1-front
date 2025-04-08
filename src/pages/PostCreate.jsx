import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import categories from "../util/categories";

export default function PostCreate() {
  const navigate = useNavigate();
  const { posts, setPosts } = usePosts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      item_id: posts.length + 1,
      ...formData,
      status: "available",
    };

    setPosts([...posts, newPost]);
    navigate("/app/posts");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          className="w-full p-2 border rounded"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setFormData((prev) => ({
                ...prev,
                photo: URL.createObjectURL(file), // temporary for local preview
                file, // if we want to upload file to server
              }));
            }
          }}
        />
        {formData.photo && (
          <img
            src={formData.photo}
            alt="Preview"
            className="mt-4 w-full max-w-xs rounded shadow"
          />
        )}
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}
