import React, { useState, useMemo } from "react";
import { usePosts } from "../context/PostsContext";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";

export default function Sidebar() {
  const {
    posts = [],
    activeCategories = [],
    setActiveCategories = () =>
      console.warn("setActiveCategories not implemented"),
  } = usePosts();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainCategories = useMemo(() => {
    try {
      return [
        ...new Set(posts.map((post) => post?.category || "Uncategorized")),
      ].sort();
    } catch (error) {
      console.error("Category processing error:", error);
      return [];
    }
  }, [posts]);

  const handleCategorySelect = (category) => {
    if (!Array.isArray(activeCategories)) return;

    let newCategories = [];
    if (category === "All Categories") {
      // Clear all selections
      newCategories = [];
    } else {
      // Toggle single category selection
      newCategories = activeCategories.includes(category)
        ? [] // Deselect all if clicking active category
        : [category]; // Select new category
    }
    setActiveCategories(newCategories);
  };

  return (
    <>
      <button
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isSidebarOpen && (
        <div
          role="presentation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden"
        />
      )}

      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="pt-[40px] space-y-4">
          <section>
            <button
              aria-expanded={isCategoriesOpen}
              aria-controls="categories-list"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center justify-between w-full p-2 font-medium text-gray-600 hover:bg-gray rounded-lg transition-colors"
            >
              <span>Categories</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id="categories-list"
              className={`overflow-hidden transition-all duration-300 ${
                isCategoriesOpen ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <ul className="space-y-1">
                {/* All Categories Button */}
                <li>
                  <button
                    aria-pressed={activeCategories.length === 0}
                    onClick={() => handleCategorySelect("All Categories")}
                    className={`flex items-center p-2 w-full text-sm rounded-lg transition-colors ${
                      activeCategories.length === 0
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </button>
                </li>

                {mainCategories.length > 0 ? (
                  mainCategories.map((category) => (
                    <li key={category}>
                      <button
                        aria-pressed={activeCategories.includes(category)}
                        onClick={() => handleCategorySelect(category)}
                        className={`flex items-center p-2 w-full text-sm rounded-lg transition-colors ${
                          activeCategories.includes(category)
                            ? "text-emerald-600 bg-emerald-50"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500 text-sm">
                    No categories available
                  </li>
                )}
              </ul>
            </div>
          </section>

          <section aria-label="User actions" className="mt-auto">
            <ul className="pt-4 border-t border-gray-200">
              <li>
                <button
                  onClick={() => console.log("Logout")}
                  className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </button>
              </li>
            </ul>
          </section>
        </div>
      </nav>
    </>
  );
}
