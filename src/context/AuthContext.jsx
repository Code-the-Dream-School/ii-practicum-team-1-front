import { createContext, useContext, useState, useEffect } from "react";
import dummyUsers from "../context/dummyUsers.js"; // Temporary


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // user info
  const [token, setToken] = useState(null);   // JWT token

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Temporary - till backend is connected
  useEffect(() => {
    const mockUser = dummyUsers.find((u) => u.username === "user1"); // можно менять user1 → user2 и т.д.
    if (mockUser) {
      setUser(mockUser);
    }
  }, []); // 

  const login = async (formData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Something went wrong." };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const register = async (formData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Something went wrong." };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Email not sent");
      return true;
    } catch (error) {
      console.error("Forgot password error:", error);
      return false;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) throw new Error("Password reset failed");
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      return false;
    }
  };


  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout,
      register,
      forgotPassword,
      resetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
