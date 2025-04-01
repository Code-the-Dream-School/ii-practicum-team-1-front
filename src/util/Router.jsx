import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAndRegister from "../pages/LoginRegister";


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginAndRegister />} />
      </Routes>
    </Router>
  );
}
