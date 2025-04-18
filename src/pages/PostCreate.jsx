import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import categories from "../util/categories";

export default function PostCreate() {
  const navigate = useNavigate();
  const { createPost } = usePosts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photo: "",
    canDeliver: false,
  });

  // Handle text input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(formData);
    navigate("/app/posts");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-3xl font-extrabold font-montserrat text-dark mb-8">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo upload preview block */}

          {formData.photo ? (
            <div className="w-[148px] h-[148px] rounded-[20px] border border-gray-300 shadow-md overflow-hidden">
              <img
                src={formData.photo}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center w-[148px] h-[148px] rounded-[20px] border border-black cursor-pointer bg-[#F2F3F4] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-200 transition"
            >
              <img
                src="/images/photo_icon.png"
                alt="Add photo"
                className="w-16 h-16 rounded-full mb-2"
              />
              <span className="text-sm text-gray-500 font-montserrat">
                Add photos
              </span>
              <input
                id="photo-upload"
                type="file"
                name="photo"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}

          {/* Title */}

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-dark rounded-xl bg-white font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Location */}

          <input
            name="location"
            type="text"
            placeholder="Meeting location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Checkbox */}
          <label className="flex items-center space-x-2 text-dark font-montserrat text-sm">
            <input
              type="checkbox"
              name="canDeliver"
              checked={formData.canDeliver}
              onChange={handleChange}
              className="w-4 h-4 border-dark rounded"
            />
            <span>I can deliver</span>
          </label>

          {/* Description */}

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Buttons */}

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
            >
              Publish
            </button>

            <button
              type="button"
              onClick={() => navigate("/app/posts")}
              className="bg-white border border-dark text-dark rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
