import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleReset = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const token = searchParams.get("token");

    console.log("Sending new password:", password);
    console.log("Token from URL:", token);

    
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
    <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
    <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-primary mb-8">
      Reset your password</h1>
      {error && <p>{error}</p>}

      <form onSubmit={handleReset}>
        <div>
          <input
            type="password"
            placeholder="New password"
            className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full max-w-md border border-dark rounded-xl px-4 py-3 font-montserrat text-base mt-8"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit"
          className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors">Reset password</button>
          <button type="button" onClick={() => navigate("/login")}
            className="bg-white border border-black text-dark rounded-[14px] px-[30px] py-[15px] text-base  hover:border-primary  hover:text-primary">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
