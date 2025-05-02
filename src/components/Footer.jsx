import { useLocation } from "react-router-dom";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const isInApp = location.pathname.startsWith("/app");

  return (
    <footer className="mt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[100px] bg-dark text-white rounded-t-[40px] pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 px-22 md:px-0 ">
          {/* Logo and Contact */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/KindNet-white.png"
                alt="KindNet Logo"
                className="h-4"
              />
            </div>

            <p
              className="inline-block text-sm bg-white
             text-dark px-3 py-1 rounded-xl mb-2"
            >
              Contact us:
            </p>
            <a
              href="mailto:kidnet@gmail.com"
              className="text-sm font-montserrat mt-2 flex items-center gap-2 hover:underline"
            >
              <Mail size={16} /> kidnet@gmail.com
            </a>
          </div>

          {/* Links only on Landing, socials always */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {!isInApp && (
              <nav className="flex flex-col md:flex-row md:gap-6 text-sm underline">
                <a href="#about">About us</a>
                <a href="#team">Our Team</a>
                <a href="#contact">Contacts</a>
              </nav>
            )}
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 bg-white text-dark rounded-full flex items-center justify-center"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 bg-white text-dark rounded-full flex items-center justify-center"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-ligh my-6" />

        {/* Bottom Text */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white font-montserrat">
          <p>© 2025 Kidnet. All Rights Reserved.</p>
          <a href="#" className="underline mt-2 md:mt-0">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
