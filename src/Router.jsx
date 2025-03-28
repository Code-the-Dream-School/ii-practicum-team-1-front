import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginAndRegister from "./pages/LoginRegister";
import PostCreate from "./pages/PostCreate";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AppLayout from "./layout/AppLayout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/post/new" element={<PostCreate />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<LoginAndRegister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
