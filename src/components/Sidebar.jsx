import { useState } from "react";
import { usePosts } from "../context/PostsContext";

export default function Sidebar() {
  const { posts } = usePosts();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false); // Changed to false

  // Get unique categories from posts
  const categories = [...new Set(posts.map(post => post.category))];

  return (
    <nav className="sticky top-0 left-0 flex flex-col h-screen w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto p-4">
      <div className="pt-[40px]">
        <ul className="space-y-1 flex-1">
          {/* Categories Section */}
          <li>
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex items-center justify-between w-full p-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <span>Categories</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ${
              isCategoriesOpen ? "max-h-[1000px]" : "max-h-0"
            }`}>
              <ul className="pl-4 mt-2 space-y-1">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center p-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 rounded-lg transition-colors duration-200"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* User Section */}
          <li className="mt-auto">
            <ul className="space-y-1 pt-4 border-t border-gray-200">
              <li>
                <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 rounded-lg transition-colors duration-200">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 rounded-lg transition-colors duration-200">
                  Inbox
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 rounded-lg transition-colors duration-200">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200">
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
