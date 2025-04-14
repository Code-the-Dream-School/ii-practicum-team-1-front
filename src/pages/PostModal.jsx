import React from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";

export default function PostModal() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 p-4 sm:p-8 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-[#243311] opacity-85 -z-10"></div>
    <div
      className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <Post />
    </div>
  </div>
  );
}
