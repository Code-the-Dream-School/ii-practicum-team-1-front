import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      
      <div className="flex flex-1"> {/* Parent flex container */}
        <Sidebar />
        
        <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
    </div>
  );
}
