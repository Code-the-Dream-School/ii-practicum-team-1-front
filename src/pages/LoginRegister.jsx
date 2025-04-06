import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotForm, setShowForgotForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

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
  };

  return (
    <div>
      <h1 >
        {showForgotForm
          ? "Reset your password"
          : isLogin
          ? "Login to KindNet"
          : "Sign up to KindNet"}
      </h1>

      {!showForgotForm && (
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {isLogin ? "Sign up →" : "Login →"}
          </button>
        </p>
      )}

      {/* Forgot password form */}
      {showForgotForm ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <div>
            <button
              type="button"
              onClick={() => {
                console.log("Reset request sent for:", resetEmail);
                alert("If this email exists, reset instructions will be sent.");
                setShowForgotForm(false);
                setResetEmail("");
              }}
            >
              Send reset link
            </button>
            <button type="button" onClick={() => setShowForgotForm(false)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Login/Register form */}
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

            {!isLogin && <p>Password must be at least 8 characters.</p>}

            <div>
              <button type="submit">
                {isLogin ? "Login" : "Create account"}
              </button>
              <button type="button" onClick={() => navigate("/")}>
                Cancel
              </button>
            </div>
          </form>

          {isLogin && (
            <p>
              <button
                type="button"
                onClick={() => setShowForgotForm(true)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </button>
            </p>
          )}
        </>
      )}

      {/* Google Login (shown only if not in forgot mode) */}
      {!showForgotForm && (
        <div>
          <p>{isLogin ? "Login with:" : "Sign up with:"}</p>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google credential response:", credentialResponse);
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>
      )}
    </div>
  );
}
