import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-no-repeat bg-cover bg-[url('/images/bg.png')]">
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
