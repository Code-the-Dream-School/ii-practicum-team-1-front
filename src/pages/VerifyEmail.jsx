import { useSearchParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { verifyEmailRequest } from "../util/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get("from");
  const fromRegister = fromParam === "register";
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const isVerifyingRef = useRef(false);

  useEffect(() => {
    const verify = async () => {
      if (isVerifyingRef.current) return;
      isVerifyingRef.current = true;

      try {
        const response = await verifyEmailRequest({ token, email });
        setStatus("success");
        setMessage(response.message);
      } catch (err) {
        const errorMessage =
          err.message || "Invalid or expired verification token";

        if (errorMessage.toLowerCase().includes("already verified")) {
          setStatus("success");
          setMessage("Your email is already verified. You can now log in.");
        } else {
          setStatus("error");
          setMessage(errorMessage);
        }
      }
    };

    if (token && email) {
      verify();
    } else if (!fromRegister) {
      setStatus("error");
      setMessage("Invalid verification link");
    } else {
      setStatus("waiting");
    }
  }, [token, email, fromRegister]);

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
                Please check your email to verify your account before logging
                in.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
