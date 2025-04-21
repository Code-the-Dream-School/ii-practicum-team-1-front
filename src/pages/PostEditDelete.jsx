import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import categories from "../util/categories";

export default function PosteditDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, updatePost, deletePost, currentPost } = usePosts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photo: "",
    canDeliver: false,
  });

  //Load existing post
  useEffect(() => {
    getPost(Number(id));
  }, [id]);

  useEffect(() => {
    if (currentPost && currentPost.item_id === Number(id)) {
      setFormData({
        title: currentPost.title || "",
        description: currentPost.description || "",
        category: currentPost.category || "",
        location: currentPost.location || "",
        photo: currentPost.photo || "",
        canDeliver: currentPost.canDeliver || false,
      });
    }
  }, [currentPost]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(Number(id), formData);
    navigate("/app/posts");
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirm) return;
    await deletePost(Number(id));
    navigate("/app/posts");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-3xl font-extrabold font-montserrat text-primary mb-8">
          Edit item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image preview block */}
          {formData.photo && (
            <div className="flex items-end gap-4">
              {/* Image */}
              <div className="w-[148px] h-[148px] rounded-[20px] border border-gray-300 shadow-md overflow-hidden">
                <img
                  src={formData.photo}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, photo: "" }))}
                className="text-sm text-black font-montserrat flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                🗑 Delete
              </button>
            </div>
          )}

          {/* Title */}
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm"
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm"
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
            placeholder="Meeting location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm"
          />

          {/* Checkbox */}
          <label className="flex items-center space-x-2 font-montserrat text-sm">
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
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm"
          />

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
            >
              Save changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/app/posts")}
              className="bg-white border border-dark text-dark rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
          </div>
          {/* Soft delete button */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-600 font-montserrat mb-2">
              This item is no longer available?
            </p>
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 text-sm text-dark font-montserrat hover:text-primary transition-colors"
            >
              🗑 Delete item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
