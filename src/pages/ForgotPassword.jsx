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
    <div>
      <h1>Reset your password</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
      />
      <div>
        <button type="button" onClick={handleReset}>
          Send reset link
        </button>
        <button type="button" onClick={() => navigate("/login")}>
          Cancel
        </button>
      </div>
    </div>
  );
}
