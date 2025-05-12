import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  forgotPasswordRequest,
  resetPasswordRequest,
  verifyEmailRequest,
} from "../util/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (formData) => {
    try {
      const data = await loginUser(formData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const data = await registerUser(formData);
      /* setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); */
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const forgotPassword = async (email) => {
    try {
      await forgotPasswordRequest(email);
      return true;
    } catch (error) {
      console.error("Forgot password error:", error);
      return false;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await resetPasswordRequest(token, password);
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      return false;
    }
  };

  const verifyEmail = async ({ token, email }) => {
    try {
      await verifyEmailRequest({ token, email });
      return true;
    } catch (error) {
      console.error("Email verification error:", error);
      return false;
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
