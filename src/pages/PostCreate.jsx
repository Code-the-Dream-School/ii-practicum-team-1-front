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

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload for local preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
        file,
      }));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      item_id: Date.now(),
      ...formData,
      status: "available",
    };
    setPosts([...posts, newPost]);
    navigate("/app/posts");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-dark mb-6 text-center font-montserrat">
          Create New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#76D900]" // TODO: use focus:ring-primary
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#76D900]" // TODO: use focus:ring-primary
            value={formData.description}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#76D900]" // TODO: use focus:ring-primary
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            name="location"
            type="text"
            placeholder="Location"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#76D900]" // TODO: use focus:ring-primary
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="photo"
            accept="image/*"
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-xl cursor-pointer bg-white
             file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-primary
             file:text-sm file:font-semibold file:bg-primary file:text-dark
             hover:file:bg-secondary hover:file:text-dark"
             onChange={handleImageChange}
          />

          {formData.photo && (
            <img
              src={formData.photo}
              alt="Preview"
              className="w-full max-w-xs mx-auto mt-4 rounded-lg shadow"
            />
          )}

<div className="flex items-center justify-center gap-4 mt-6">
  <button
    type="submit"
    className="bg-black text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
  >
    Post
  </button>

  <button
    type="button"
    onClick={() => navigate("/app/posts")}
    className="bg-white border border-black text-dark rounded-[14px] px-[30px] py-[15px] text-base font-montserrat hover:border-primary hover:text-primary transition-colors"
  >
    Cancel
  </button>
</div>

        </form>
      </div>
    </div>
  );
}
