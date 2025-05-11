import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyEmailRequest } from "../util/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [message, setMessage] = useState("Verifying...");
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmailRequest({ token, email });
        setMessage("Your email has been verified! You can now login.");
      } catch (err) {
        setError(err.message || "Verification failed");
      }
    };
    if (token && email) {
      verify();
    } else {
      setError("Invalid verification link");
    }
  }, [token, email]);

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-[url('/images/bg.png')] flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold font-montserrat text-primary mb-4">
          Verify Email
        </h1>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div>
            <p className="text-primary mb-4">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="text-dark underline hover:text-primary"
            >
              Go to Login →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
