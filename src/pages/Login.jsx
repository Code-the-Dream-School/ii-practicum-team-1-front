import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const errorParam = searchParams.get("error");


  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const id = searchParams.get("id");
    const username = searchParams.get("username");
    const first_name = searchParams.get("first_name");
    const last_name = searchParams.get("last_name");
    const phone_number = searchParams.get("phone_number");
    const zip_code = searchParams.get("zip_code");
    const avatar_url = searchParams.get("avatar_url");

    if (token && email) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id,
          email,
          username,
          first_name,
          last_name,
          phone_number,
          zip_code,
          avatar_url,
        })
      );
      navigate("/app/posts");
    }
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill out all required fields.");
      return;
    }

    const result = await login(formData);
    if (result.success) {
      navigate("/app/posts");
    } else {
      setError("Login failed: " + result.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
      <div className="flex-1">
        <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
          <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-primary mb-8">
            Login to KindNet
          </h1>

          <p className="text-lg text-dark font-montserrat">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold font-montserrat hover:underline"
            >
              Sign up →
            </Link>
          </p>

          {(error || errorParam === "user_not_found") && (
            <p className="text-red-600 font-montserrat mt-4">
              {errorParam === "user_not_found"
                ? "User with this Google account was not found. Please register first."
                : error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-8"
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

            <div className="flex items-center gap-4 mt-8">
              <button
                type="submit"
                className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-white border border-dark text-dark rounded-[14px] px-[30px] py-[15px] text-base hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
            </div>
          </form>

          <p className="mt-6">
            <Link
              to="/forgot-password"
              className="text-primary font-montserrat text-label hover:underline transition"
            >
              Forgot password?
            </Link>
          </p>

          <div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `${
                    import.meta.env.VITE_API_URL
                  }/auth/google`;
                }}
                className="flex items-center gap-2 border bg-white text-dark rounded-[14px] px-[30px] py-[15px] text-base hover:border hover:border-primary hover:text-primary transition-all"
              >
                <img
                  src="/icons/google-icon.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
