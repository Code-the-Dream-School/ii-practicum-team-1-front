import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-[100px] pt-20">
        <div className="flex items-start">
          <Sidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
