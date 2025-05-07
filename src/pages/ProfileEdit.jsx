import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function ProfileEdit() {
  const { user } = useAuth();

  if (!user) return <p>User not found</p>;

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
    zip_code: user?.zip_code || "",
    avatar: user.avatar || null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const zipRegex = /^\d{5}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-zА-Яа-яЁё]{2,}$/;

    if (!zipRegex.test(formData.zip_code)) {
      alert("ZIP Code must be exactly 5 digits.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!nameRegex.test(formData.first_name)) {
      alert("First name must be at least 2 letters and contain only letters.");
      return;
    }

    if (!nameRegex.test(formData.last_name)) {
      alert("Last name must be at least 2 letters and contain only letters.");
      return;
    }
    console.log("Updated profile:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold font-montserrat text-dark mb-6">
          Edit Profile
        </h1>

        <label htmlFor="avatar" className="cursor-pointer block mb-8">
          {formData.avatar ? (
            <img
              src={
                typeof formData.avatar === "object"
                  ? URL.createObjectURL(formData.avatar)
                  : formData.avatar
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
            { name: "username", placeholder: "Username" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "first_name", placeholder: "First Name" },
            { name: "last_name", placeholder: "Last Name" },
            { name: "phone_number", placeholder: "Phone Number" },
            { name: "zip_code", placeholder: "ZIP Code" },
          ].map(({ name, placeholder, type = "text" }) => (
            <input
              key={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-md font-montserrat focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          ))}

          <div>
            <input
              type="file"
              id="avatar"
              name="avatar"
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
    </div>
  );
}
