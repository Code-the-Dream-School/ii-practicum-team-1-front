import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(location.pathname);
  const [logoSrc, setLogoSrc] = useState("/images/KindNet.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="w-full bg-white z-50 relative sticky top-0">
      <div className="max-w-[1440px] px-4 md:px-[100px] mx-auto py-4 min-h-[100px] flex items-center justify-between">
        {/* Logo + burger menu for landing page */}
        <div className="flex items-center gap-4">
          {!isAuthPage && isLanding && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6 text-dark" />
            </button>
          )}

          {/* Logo behavior based on page and user state */}
          {user ? (
            <Link to="/app/posts" className="flex items-center gap-2">
              <img
                src={logoSrc}
                alt="KindNet logo"
                className="h-6 w-auto object-contain transition-all duration-300"
                onMouseEnter={() => setLogoSrc("/images/KindNet-green.png")}
                onMouseLeave={() => setLogoSrc("/images/KindNet.png")}
              />
            </Link>
          ) : isAuthPage ? (
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logoSrc}
                alt="KindNet logo"
                className="h-6 w-auto object-contain transition-all duration-300"
                onMouseEnter={() => setLogoSrc("/images/KindNet-green.png")}
                onMouseLeave={() => setLogoSrc("/images/KindNet.png")}
              />
            </Link>
          ) : (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
            >
              <img
                src={logoSrc}
                alt="KindNet logo"
                className="h-6 w-auto object-contain transition-all duration-300"
                onMouseEnter={() => setLogoSrc("/images/KindNet-green.png")}
                onMouseLeave={() => setLogoSrc("/images/KindNet.png")}
              />
            </button>
          )}
        </div>

        {/* Add post button */}
        {user && !isAuthPage && (
          <Link
            to="/app/posts/new"
            className={`rounded-[14px] px-[20px] py-[10px] font-montserrat text-base transition-colors md:ml-auto mr-4 leading-none ${
              location.pathname === "/app/posts/new"
                ? "bg-secondary text-dark"
                : "bg-dark text-white hover:bg-secondary hover:text-dark"
            }`}
          >
            + Add post
          </Link>
        )}

        {/* Navigation links or user profile */}
        {!isAuthPage && (
          <div className="flex items-center gap-4">
            {!user && isLanding && (
              <div className="hidden md:flex gap-6 items-center">
                <a href="#about" className="text-base text-dark hover:text-primary leading-none">
                  About us
                </a>
                <a href="#team" className="text-base text-dark hover:text-primary leading-none">
                  Our team
                </a>
                <a href="#contacts" className="text-base text-dark hover:text-primary leading-none">
                  Contacts
                </a>
                <Link to="/login" className="bg-dark text-white rounded-[14px] px-[20px] py-[10px] text-base hover:bg-secondary hover:text-dark leading-none">
                  Login
                </Link>
                <Link to="/register" className="bg-white border border-black text-dark rounded-[14px] px-[20px] py-[10px] text-base hover:border-primary hover:text-primary leading-none">
                  Sign up
                </Link>
              </div>
            )}

            {user && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.avatar_url || "/icons/avatar.svg"}
                    alt={user?.name || "User avatar"}
                    className="w-8 h-8 rounded-full object-cover border border-dark"
                  />
                  <span className="text-base text-dark">
                    {user?.name || user?.first_name || "User"}
                  </span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-light rounded-xl p-2 w-40 z-50">
                    <Link to="/app/profile?tab=info" className="block px-4 py-2 text-sm text-dark hover:text-primary">
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-dark hover:text-primary"
                    >
                      Logout →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {!user && isLanding && menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4">
          <a href="#about" className="text-base text-dark hover:text-primary leading-none">
            About us
          </a>
          <a href="#team" className="text-base text-dark hover:text-primary leading-none">
            Our team
          </a>
          <a href="#contacts" className="text-base text-dark hover:text-primary leading-none">
            Contacts
          </a>
          <Link to="/login" className="bg-dark text-white rounded-[14px] px-[20px] py-[10px] text-base hover:bg-secondary hover:text-dark leading-none">
            Login
          </Link>
          <Link to="/register" className="bg-white border border-black text-dark rounded-[14px] px-[20px] py-[10px] text-base hover:border-primary hover:text-primary leading-none">
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
}
