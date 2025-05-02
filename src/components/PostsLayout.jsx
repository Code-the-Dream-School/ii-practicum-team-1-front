import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function PostsLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
