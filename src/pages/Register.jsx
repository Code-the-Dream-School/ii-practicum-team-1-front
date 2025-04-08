import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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
    <div className="min-h-screen bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
    <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
    <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-primary mb-8">
      Sign up to KindNet</h1>

      <p className="text-lg text-dark font-montserrat">
        Already have an account? <Link to="/login"
        className="text-primary font-semibold font-montserrat hover:underline"
        >
        Login →</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-8"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-4"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-4"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <p className=" text-dark font-montserrat text-base mt-4" >
          Password must be at least 8 characters.</p>

          <div className="flex items-center gap-4 mt-8">
          <button type="submit"
          className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
          >Create account</button>
          <button type="button" onClick={() => navigate("/")}
            className="bg-white border border-black text-dark rounded-[14px] px-[30px] py-[15px] text-base  hover:border-primary  hover:text-primary">
            Cancel
          </button>
        </div>
      </form>

      <div>
    <div className="w-5 h-5 mt-8">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Google credential response:", credentialResponse);
        }}
        onError={() => {
          console.log("Google Login Failed");
        }}
        width="24" 
        ux_mode="popup"
        useOneTap={false}
      />
    </div>
  </div>

    </div>
  </div>
  );
}
