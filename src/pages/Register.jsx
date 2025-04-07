import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill out all required fields.");
      return;
    }

    const url = "/api/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        navigate("/app/posts");
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Sign up to KindNet</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <p>Password must be at least 8 characters.</p>

        <div>
          <button type="submit">Create account</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>

      <p>
        Already have an account? <Link to="/login">Login →</Link>
      </p>
    </div>
  );
}
