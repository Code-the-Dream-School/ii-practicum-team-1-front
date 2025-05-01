import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
