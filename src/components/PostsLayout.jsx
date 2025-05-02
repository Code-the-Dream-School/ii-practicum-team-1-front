import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function PostsLayout() {
  const location = useLocation();
  const showSidebar = location.pathname.replace(/\/$/, "") === "/app/posts";

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-[100px] pt-20">
        <div className="flex items-start">
          {showSidebar && <Sidebar />}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
