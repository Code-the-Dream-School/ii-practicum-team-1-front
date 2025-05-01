import React, { useState } from "react";
import { usePosts } from "../context/PostsContext";
import categories from "../util/categories";

import {
  ChevronLeft,
  List,
  Book,
  ToyBrick,
  Sofa,
  Dumbbell,
  Home,
  Baby,
  Tv,
  Paintbrush2,
  LampDesk,
  Shirt,
  Flower,
  WashingMachine,
  Wrench,
  Layers,
} from "lucide-react";

export default function Sidebar() {
  const {
    activeCategories = [],
    setActiveCategories = () =>
      console.warn("setActiveCategories not implemented"),
  } = usePosts();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCategorySelect = (category) => {
    const newCategories = category === "All Categories" ? [] : [category];
    setActiveCategories(newCategories);
    setIsSidebarOpen(false);
  };

  const categoryIcons = {
    Books: <Book size={18} strokeWidth={2} />,
    Toys: <ToyBrick size={18} strokeWidth={2} />,
    Furniture: <Sofa size={18} strokeWidth={2} />,
    Fitness: <Dumbbell size={18} strokeWidth={2} />,
    Home: <Home size={18} strokeWidth={2} />,
    Kids: <Baby size={18} strokeWidth={2} />,
    Appliances: <WashingMachine size={18} strokeWidth={2} />,
    Decor: <LampDesk size={18} strokeWidth={2} />,
    Clothing: <Shirt size={18} strokeWidth={2} />,
    Electronics: <Tv size={18} strokeWidth={2} />,
    Garden: <Flower size={18} strokeWidth={2} />,
    "Art Supplies": <Paintbrush2 size={18} strokeWidth={2} />,
    Storage: <Layers size={18} strokeWidth={2} />,
    Tools: <Wrench size={18} strokeWidth={2} />,
  };

  return (
    <>
      {!isSidebarOpen && (
        <button
          aria-label="Open categories"
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 sm:left-[100px] z-50 bg-dark text-white rounded-[14px] px-[24px] py-[12px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors"
        >
          All Categories
        </button>
      )}

      <nav
        aria-label="Main navigation"
        className={`
          w-full md:w-[220px] p-4 bg-gray-light rounded-none md:rounded-3xl
          overflow-y-auto transition-transform duration-300 ease-in-out
          shrink-0 mr-0 md:mr-10 z-50
          fixed top-0 left-0 h-screen
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:h-auto md:translate-x-0
        `}
      >
        {isSidebarOpen && (
          <button
            className="md:hidden flex items-center gap-1 mb-6 text-gray text-sm hover:text-dark transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            ← Back
          </button>
        )}

        <ul className="space-y-1">
          {/* All Categories */}
          <li>
            <button
              onClick={() => handleCategorySelect("All Categories")}
              className={`flex items-center p-2 w-full text-sm rounded-lg transition-colors ${
                activeCategories.length === 0
                  ? "text-dark font-bold"
                  : "text-dark"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                  activeCategories.length === 0 ? "bg-lime-300" : "bg-gray-300"
                }`}
              >
                <List size={18} strokeWidth={2} />
              </div>
              All Categories
            </button>
          </li>

          {categories.map((category) => {
            const isActive = activeCategories.includes(category);
            return (
              <li key={category}>
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={`flex items-center p-2 w-full text-sm rounded-lg transition-colors ${
                    isActive ? "text-dark font-bold" : "text-dark"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                      isActive ? "bg-lime-300" : "bg-gray-300"
                    }`}
                  >
                    {categoryIcons[category] || null}
                  </div>
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
