import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";


const URL = "http://localhost:8000/api/v1/";

function App() {
  const [message, setMessage] = useState("");

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
          <Router>
            <AppRouter />
          </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
