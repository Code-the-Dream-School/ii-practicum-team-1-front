import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      const success = await verifyEmail({ token, email });
      if (success) {
        setMessage("Your email has been verified! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError("Verification failed or invalid link.");
      }
    };
    if (token && email) verify();
    else setError("Invalid verification link");
  }, [token, email, navigate, verifyEmail]);

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
      <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
        <h1 className="text-4xl font-extrabold font-montserrat text-primary mb-4">
          Verify Email
        </h1>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p className="text-primary">{message}</p>
        )}
      </div>
    </div>
  );
}
