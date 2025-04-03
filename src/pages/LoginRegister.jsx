import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";


export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.username)
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    const url = isLogin ? "/api/login" : "/api/register";
    console.log("Submitting to:", url);
    console.log(formData);

    // When backend is ready
    /*
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
    alert("Login or registration failed: " + data.message);
  }
} catch (error) {
  alert("Something went wrong. Please try again later.");
}
    */
  };

  return (
    <div>
      {/* Main heading */}
      <h1>{isLogin ? "Login to KindNet" : "Sign up to KindNet"}</h1>

      {/* Subtitle with toggle link */}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLogin(!isLogin);
          }}
          style={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Sign up →" : "Login →"}
        </a>
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
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
        )}

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

        {!isLogin && (
          <p>
            Password should be at least 15 characters OR at least 8 characters
            including a number and a lowercase letter.
          </p>
        )}

        <div>
          <button type="submit">{isLogin ? "Login" : "Create account"}</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>

      {/* Google auth placeholder */}
      <div>
        <p>{isLogin ? "Login with:" : "Sign up with:"}</p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google credential response:", credentialResponse);
            // TODO: endpoint to verify the Google token, waiting for backend endpoint
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
        />
      </div>
    </div>
  );
}

