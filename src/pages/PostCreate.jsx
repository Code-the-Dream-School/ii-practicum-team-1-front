import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import categories from "../util/categories";
import { Link } from "react-router-dom";

export default function PostCreate() {
  const navigate = useNavigate();
  const { createPost } = usePosts();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photos: [],
    can_deliver: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/app/posts");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPhotoObjs = files.map((file) => ({
        type: "new",
        file,
      }));
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotoObjs],
      }));
    }
    e.target.value = "";
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

    form.append("can_deliver", formData.can_deliver);

    try {
      await createPost(form);
      showModal("Post created successfully");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Something went wrong while creating the post.");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto pt-20">
      <div className="max-w-[720px] w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link to="/app/posts" className="text-sm text-dark hover:text-primary">
            ← Back to all posts
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold font-montserrat text-primary mb-8">
          Create Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo upload block */}
          <div className="space-y-2">
            <label className="block font-montserrat text-sm">Photos</label>
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center w-[148px] h-[148px] rounded-[20px] border border-black cursor-pointer bg-[#F2F3F4] shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-200 transition"
            >
              <img
                src="/icons/photo_icon.png"
                alt="Add photo"
                className="w-16 h-16 rounded-full mb-2"
              />
              <span className="text-sm text-gray-500 font-montserrat">Add photos</span>
              <input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {formData.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                {formData.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="relative w-full h-[148px] border border-gray-300 rounded-xl overflow-hidden"
                  >
                    <img
                      src={photo.file ? URL.createObjectURL(photo.file) : ""}
                      alt={`Photo ${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          photos: prev.photos.filter((_, i) => i !== idx),
                        }))
                      }
                      className="absolute top-1 right-1 bg-white text-black text-sm px-2 py-1 rounded-full shadow hover:bg-red-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Category */}
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
            placeholder="Enter the ZIP code of your meeting location"
            value={formData.location}
            onChange={handleChange}
            required
            pattern="\d{5}"
            title="ZIP code must be 5 digits"
            className="w-full px-4 py-3 border border-dark rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Checkbox */}
          <label className="flex items-center space-x-2 text-dark font-montserrat text-sm">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#243311]/85 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <p className="text-dark mb-4">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className="bg-dark text-white rounded-[14px] px-[30px] py-[10px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
