import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { PostsProvider } from "../context/PostsContext";

export default function PostsLayout() {
  const location = useLocation();
  const showSidebar = location.pathname.replace(/\/$/, "") === "/app/posts";

  return (
    <PostsProvider>
    <div className="w-full ">
      <div className="max-w-[1440px] mx-auto px-[20px] sm:px-[40px] lg:px-[100px] pt-10 ">
        <div className="flex items-start">
          {showSidebar && <Sidebar />}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
    </PostsProvider>
  );
}
