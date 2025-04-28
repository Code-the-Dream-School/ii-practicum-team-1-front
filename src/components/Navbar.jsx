import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );
  const [logoSrc, setLogoSrc] = useState("/images/KindNet.png");

  return (
    <nav className="w-full bg-white z-50 relative">
      <div className="max-w-[1440px] px-[100px] mx-auto py-4 min-h-[100px] flex items-center justify-between">
      <Link to={user ? "/app/posts" : "/"} className="flex items-center gap-2">
          <img
            src={logoSrc}
            alt="KindNet logo"
            className="h-6 w-auto object-contain transition-all duration-300"
            onMouseEnter={() => setLogoSrc("/images/KindNet-green.png")}
            onMouseLeave={() => setLogoSrc("/images/KindNet.png")}
          />
        </Link>

        {isAuthPage ? null : (
          <>
            {/* Landing page menu BEFORE login */}
            {!user && isLanding && (
              <div className="flex items-center gap-6">
                <a
                  href="#about"
                  className="text-base text-gray hover:text-primary"
                >
                  About us
                </a>
                <a
                  href="#team"
                  className="text-base text-gray hover:text-primary"
                >
                  Our team
                </a>
                <a
                  href="#contacts"
                  className="text-base text-gray hover:text-primary"
                >
                  Contacts
                </a>
                <Link
                  to="/login"
                  className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white border border-black text-dark rounded-[14px] px-[30px] py-[15px] text-base hover:border-primary hover:text-primary"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Landing page menu AFTER login */}
            {user && isLanding && (
              <div className="flex items-center gap-6">
                <Link
                  to="/app/posts/new"
                  className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark"
                >
                  + Add post
                </Link>

                {/* Avatar dropdown on hover */}
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img
                      src={user?.avatar || "/icons/avatar.svg"}
                      alt={user?.name || "User avatar"}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-montserrat font-semibold text-sm">
                      {user?.name}
                    </span>
                  </div>
                  <div
                    className="absolute right-0 mt-2 bg-white border border-gray-light rounded-xl p-2 w-40 z-50
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  >
                    <Link
                      to="/app/profile?tab=items"
                      className="block px-4 py-2 text-sm text-dark hover:text-primary"
                    >
                      My items
                    </Link>
                    <Link
                      to="/app/profile?tab=info"
                      className="block px-4 py-2 text-sm text-dark hover:text-primary"
                    >
                      Account info
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-dark hover:text-primary"
                    >
                      Logout →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Inside app routes */}
            {user && !isLanding && (
              <div className="flex items-center gap-6">
                <Link
                  to="/app/posts/new"
                  className={`rounded-[14px] px-[30px] py-[15px] font-montserrat text-base transition-colors ${
                    location.pathname === "/app/posts/new"
                      ? "bg-secondary text-dark"
                      : "bg-dark text-white hover:bg-secondary hover:text-dark"
                  }`}
                >
                  + Add post
                </Link>

                {/* Avatar dropdown on hover */}
                <div className="relative group">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img
                      src={user?.avatar || "/icons/avatar.svg"}
                      alt={user?.name || "User avatar"}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-montserrat font-semibold text-sm">
                      {user?.name}
                    </span>
                  </div>
                  <div
                    className="absolute right-0 mt-2 bg-white border border-gray-light rounded-xl p-2 w-40 z-50
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  >
                    <Link
                      to="/app/profile?tab=items"
                      className="block px-4 py-2 text-sm text-dark hover:text-primary"
                    >
                      My items
                    </Link>
                    <Link
                      to="/app/profile?tab=info"
                      className="block px-4 py-2 text-sm text-dark hover:text-primary"
                    >
                      Account info
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-dark hover:text-primary"
                    >
                      Logout →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
