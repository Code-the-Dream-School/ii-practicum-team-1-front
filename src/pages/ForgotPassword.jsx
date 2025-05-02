import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function ForgotPassword() {
  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resetEmail) {
      setError("Please enter your email");
      return;
    }

    const success = await forgotPassword(resetEmail);
    if (success) {
      alert("If this email exists, reset instructions will be sent.");
      navigate("/login");
    } else {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
      <div className="flex-1">
        <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
          <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-primary mb-8">
            Reset your password
          </h1>

          {error && <p className="text-red-600 font-montserrat mt-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-8"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            <div className="flex items-center gap-4 mt-8">
              <button
                type="submit"
                className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
              >
                Send reset link
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="bg-white border border-dark text-dark rounded-[14px] px-[30px] py-[15px] text-base hover:border-primary hover:text-primary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
