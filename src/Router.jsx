import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginAndRegister from "./pages/LoginRegister";
import PostCreate from "./pages/PostCreate";
import Post from "./pages/Post";
import PostEdit from "./pages/PostEdit";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";
import AppLayout from "./layout/AppLayout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/map" element={<Map />} />
          <Route path="/post/new" element={<PostCreate />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<PostEdit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<LoginAndRegister />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
