import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill out all required fields.");
      return;
    }

    const url = "/api/login";

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
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Login to KindNet</h1>

      <form onSubmit={handleSubmit}>
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

        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>

      <p>
        Don’t have an account? <Link to="/register">Sign up →</Link>
      </p>

      <p>
        <Link to="/forgot-password">Forgot password?</Link>
      </p>

      <div>
        <p>Login with:</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google credential response:", credentialResponse);
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />
      </div>
    </div>
  );
}
