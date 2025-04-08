import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    console.log("Reset request sent for:", resetEmail);
    alert("If this email exists, reset instructions will be sent.");
    setResetEmail("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
    <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
    <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-primary mb-8">
      Reset your password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-8"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
      />
     <div className="flex items-center gap-4 mt-8">
        <button type="button" onClick={handleReset}
        className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors">
          Send reset link
        </button>
        <button type="button" onClick={() => navigate("/login")}
          className="bg-white border border-black text-dark rounded-[14px] px-[30px] py-[15px] text-base  hover:border-primary  hover:text-primary">
          Cancel
        </button>
      </div>
    </div>
    </div>
  );
}
