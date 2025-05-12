import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyEmailRequest } from "../util/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const fromParam = searchParams.get("from");
  const fromRegister = fromParam === "register";
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmailRequest({ token, email });
        setStatus("success");
        setMessage(response.message);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Invalid or expired verification token");
      }
    };

    if (token && email) verify();
    else if (!fromRegister) {
      setStatus("error");
      setMessage("Invalid verification link");
    } else {
      setStatus("waiting");
    }
  }, [token, email]);

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
      <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
        <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-primary mb-4">
          Verify Email
        </h1>

        {status === "success" && (
          <div>
            <p className="text-primary font-montserrat mt-4">{message}</p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="text-dark underline hover:text-primary mt-4"
            >
              Start exploring the app →
            </button>
          </div>
        )}
        {status === "error" && (
          <p className="text-red-600 font-montserrat mt-4">{message}</p>
        )}
        {status === "loading" && (
          <p className="text-primary font-montserrat mt-4">Verifying...</p>
        )}
        {status === "waiting" && (
          <div className="text-primary font-montserrat mt-4">
            <p>Thank you for registering!</p>
            <div className="text-dark font-montserrat mt-4">
            <p>
              Please check your email to verify your account before logging in.
            </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
