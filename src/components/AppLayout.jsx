import { Outlet } from "react-router-dom";

export default function AppLayout({ children }) {
  return (
    <div>
      {/* This is a place for Header */}
      <main>
        <Outlet />
      </main>
      {/* This is a place for Footer */}
    </div>
  );
}
