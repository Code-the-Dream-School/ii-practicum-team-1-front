import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRouter from "./components/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostsContext";
import { getAllData } from "./util/index";

const URL = "http://localhost:8000/api/v1/";

function AppContent() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state && state.backgroundLocation;

  return <AppRouter location={location} backgroundLocation={backgroundLocation} />;
}

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <PostsProvider>
          <Router>
            <AppContent />
          </Router>
        </PostsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
