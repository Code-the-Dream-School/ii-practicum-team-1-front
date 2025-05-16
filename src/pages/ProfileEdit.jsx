import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateUser } from "../util/api";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) return <p>User not found</p>;

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    zip_code: user?.zip_code || "",
    image: user.avatar_url || null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [navigateAfterClose, setNavigateAfterClose] = useState(false);

  const showModal = (message, shouldNavigate = false) => {
    setModalMessage(message);
    setIsModalOpen(true);
    setNavigateAfterClose(shouldNavigate);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (navigateAfterClose) {
      navigate("/app/profile");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const zipRegex = /^\d{5}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-zА-Яа-яЁё]{2,}$/;

    if (!zipRegex.test(formData.zip_code)) {
      showModal("ZIP Code must be exactly 5 digits.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      showModal("Please enter a valid email address.");
      return;
    }

    if (!nameRegex.test(formData.first_name)) {
      showModal("First name must be at least 2 letters and contain only letters.");
      return;
    }

    if (!nameRegex.test(formData.last_name)) {
      showModal("Last name must be at least 2 letters and contain only letters.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formToSend = { ...formData };
      if (!(formToSend.image instanceof File)) {
        delete formToSend.image;
      }

      const updatedUser = await updateUser(formToSend, token);
      setUser(updatedUser.user);
      setFormData({
        username: updatedUser.user.username || "",
        email: updatedUser.user.email || "",
        first_name: updatedUser.user.first_name || "",
        last_name: updatedUser.user.last_name || "",
        phone_number: updatedUser.user.phone_number || "",
        zip_code: updatedUser.user.zip_code || "",
        image: updatedUser.user.avatar_url || null,
      });

      localStorage.setItem("user", JSON.stringify(updatedUser.user));
      showModal("Profile updated successfully", true);
    } catch (error) {
      console.error(error);
      showModal("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white relative">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold font-montserrat text-dark mb-6">
          Edit Profile
        </h1>

        <label htmlFor="avatar" className="cursor-pointer block mb-8">
          {formData.image ? (
            <img
              src={
                typeof formData.image === "object"
                  ? URL.createObjectURL(formData.image)
                  : formData.image
              }
              alt="Avatar preview"
              className="w-24 h-24 object-cover rounded-full border"
            />
          ) : (
            <img
              src="/icons/photo_icon.png"
              alt="Upload avatar"
              className="w-24 h-24 object-cover rounded-full border p-2 opacity-50 hover:opacity-100 transition-opacity"
            />
          )}
        </label>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "username", placeholder: "Username", disabled: true },
            { name: "email", placeholder: "Email", type: "email", disabled: true },
            { name: "first_name", placeholder: "First Name" },
            { name: "last_name", placeholder: "Last Name" },
            { name: "phone_number", placeholder: "Phone Number" },
            { name: "zip_code", placeholder: "ZIP Code" },
          ].map(({ name, placeholder, type = "text", disabled = false }) => (
            <input
              key={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={disabled}
              className={`w-full px-4 py-2 border border-dark rounded-md font-montserrat focus:outline-none focus:ring-2 focus:ring-secondary ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
              }`}
            />
          ))}

          <div>
            <input
              type="file"
              id="avatar"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-dark text-white px-6 py-2 rounded-md hover:bg-secondary hover:text-dark font-montserrat transition-colors"
          >
            Save Changes
          </button>
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
