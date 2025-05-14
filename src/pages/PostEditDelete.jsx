import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import categories from "../util/categories";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, updatePost, deletePost, currentPost } = usePosts();
  const [deleteList, setDeleteList] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photos: [],
    can_deliver: false,
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
        location: currentPost.zip || "",
        photos: (currentPost.images || []).map((img) => ({
          type: "existing",
          url: img.image_url,
          public_id: img.id,
        })),
        canDeliver: currentPost.can_deliver || false,
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

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("zip", formData.location);
    form.append("category_name", formData.category);
    form.append("item_status", "available");

    formData.photos.forEach((photo) => {
      if (photo.type === "new") {
        form.append("image", photo.file);
      }
    });

    if (deleteList.length > 0) {
      form.append("deleteList", JSON.stringify(deleteList));
    }

    try {
      await updatePost(Number(id), form);
      navigate("/app/posts");
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Something went wrong while updating.");
    }
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
          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {formData.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-[148px] border border-gray-300 rounded-xl overflow-hidden"
                >
                  <img
                    src={
                      photo.type === "existing"
                        ? photo.url
                        : URL.createObjectURL(photo.file)
                    }
                    alt={`Photo ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        photos: prev.photos.filter((_, i) => i !== idx),
                      }));
                      if (photo.type === "existing") {
                        setDeleteList((prev) => [...prev, photo.public_id]);
                      }
                    }}
                    className="absolute top-1 right-1 bg-white text-black text-sm px-2 py-1 rounded-full shadow hover:bg-red-100"
                  >
                    <img
                      src="/public/icons/close.svg"
                      alt="Remove"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              ))}
              {/* Upload new images */}
              <label className="block font-montserrat text-sm text-dark">
                Add new photo(s)
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const newPhotos = files.map((file) => ({
                      type: "new",
                      file,
                    }));
                    setFormData((prev) => ({
                      ...prev,
                      photos: [...prev.photos, ...newPhotos],
                    }));
                  }}
                  className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:text-white
      hover:file:bg-secondary hover:file:text-dark transition"
                />
              </label>
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
              name="can_deliver"
              checked={formData.can_deliver}
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
