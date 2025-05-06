import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Package, Gift, Handshake, Users } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
      {/* First screen */}
      <section className="pt-20 md:pt-32 pb-10 md:pb-20">
        <div className="max-w-[1440px] px-6 md:px-[100px] mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold font-montserrat text-dark mb-6">
              Give & Receive!
            </h1>
            <p className="text-lg text-dark font-montserrat mb-8 max-w-md mx-auto md:mx-0">
              A community where unused items find new homes—completely free.
              Share what you no longer need, and discover something new for
              yourself!
            </p>
            <button
              onClick={() => navigate("/register")}
              className="bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
            >
              Get started
            </button>
          </div>
          <div className="flex-1">
            <img
              src="/images/first-screen.png"
              alt="Megaphone and icons"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="py-28 ">
        <div className="max-w-[1140px] px-6 mx-auto">
          <h2 className="text-4xl md:text-4xl font-extrabold font-montserrat text-dark mb-16 text-center">
            About us
          </h2>
          <p className="text-lg text-dark font-montserrat max-w-3xl mx-auto mb-20 text-center">
            KindNet is a platform where people can give away unused items and
            offer free help to their local community.{" "}
            <br className="hidden md:inline" />
            We believe that small acts of generosity can make a big impact.
          </p>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-16">
            {/* Images block (desktop) */}
            <div className="w-full md:w-1/2 relative min-h-[400px] hidden md:block">
              <img
                src="/images/about-1.jpg"
                alt="KindNet activity"
                className="absolute top-0 left-0 w-[65%] aspect-[4/3] object-cover 
                rounded-2xl border-2 border-dark shadow-[0_5px_0_0_#191A23] 
                hover:border-secondary hover:shadow-[0_5px_0_0_#B9FF66]"
              />
              <img
                src="/images/about-2.jpg"
                alt="Giving items"
                className="absolute top-6 right-0 w-[30%] aspect-square object-cover 
                rounded-2xl border-2 border-dark shadow-[0_5px_0_0_#191A23] 
                hover:border-secondary hover:shadow-[0_5px_0_0_#B9FF66]"
              />
              <img
                src="/images/about-3.jpg"
                alt="Community help"
                className="absolute left-[20%] bottom-0 w-[60%] aspect-[3/2] object-cover 
                rounded-2xl border-2 border-dark shadow-[0_5px_0_0_#191A23] 
                hover:border-secondary hover:shadow-[0_5px_0_0_#B9FF66]"
              />
            </div>

            {/* Mobile slider */}
            <div className="w-full md:hidden overflow-x-auto mb-6 pb-2">
              <div className="flex flex-nowrap gap-4 w-max px-1">
                {[
                  { src: "/images/about-1.jpg", alt: "KindNet activity" },
                  { src: "/images/about-2.jpg", alt: "Giving items" },
                  { src: "/images/about-3.jpg", alt: "Community help" },
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className="w-64 flex-shrink-0 rounded-2xl border-2 border-dark shadow-[0_5px_0_0_#191A23] 
        hover:border-secondary hover:shadow-[0_5px_0_0_#B9FF66]"
                  />
                ))}
              </div>
            </div>

            {/* Bullet points */}
            <div className="text-left w-full md:w-1/2 space-y-8">
              {[
                { icon: Package, text: "Give away things you no longer need" },
                { icon: Gift, text: "Get free useful items from neighbors" },
                { icon: Handshake, text: "Help others and build trust" },
                { icon: Users, text: "Strengthen your local community" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-dark hover:bg-secondary">
                    <Icon className="w-5 h-5 text-white hover:text-dark" />
                  </div>
                  <p className="text-dark font-montserrat text-base">{text}</p>
                </div>
              ))}

              <div className="w-full flex justify-center md:justify-start">
                <button
                  onClick={() => navigate("/register")}
                  className="mt-6 bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team section */}
      <section className="py-24 ">
        <div className="max-w-[1440px] px-6 md:px-[100px] mx-auto ">
          <h2 className="text-4xl font-extrabold font-montserrat text-dark text-center mb-20">
            Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Maria Zasypkina",
                role: "Front-End Developer",
                img: "/images/maria.png",
                linkedin: "#",
              },
              {
                name: "Aida Burlutckaia",
                role: "Front-End Developer",
                img: "/images/aida.png",
                linkedin: "#",
              },
              {
                name: "Kseniia Zakharova",
                role: "Back-End Developer",
                img: "/images/kseniia.png",
                linkedin: "#",
              },
              {
                name: "Romanna Bidnyk",
                role: "Back-End Developer",
                img: "/images/romanna.png",
                linkedin: "#",
              },
            ].map(({ name, role, img, linkedin }, i) => (
              <div
                key={i}
                className="rounded-[32px] border-2 border-dark shadow-[0_5px_0_0_#191A23] p-6 flex flex-col items-start bg-white"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={img}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                    style={{ backgroundColor: "#B9FF66" }}
                  />
                  <div>
                    <p className="text-lg font-bold text-dark font-montserrat">
                      {name}
                    </p>
                    <p className="text-sm text-dark font-montserrat">{role}</p>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1"
                    >
                      <img
                        src="/icons/ln.svg"
                        alt="LinkedIn"
                        className="w-5 h-5 text-dark hover:secondary transition-colors duration-200 mt-2"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
