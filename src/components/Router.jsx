import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "../pages/Landing";
import LoginAndRegister from "../pages/LoginRegister";
import PostCreate from "../pages/PostCreate";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import AppLayout from "./AppLayout";
import PostList from "../pages/PostList";
import { PostsProvider } from "../context/PostsContext";

export default function AppRouter() {
  return (
    <Router>
      <PostsProvider>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/login" element={<LoginAndRegister />} />

        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="posts" />} />

          <Route path="posts">
            <Route index element={<PostList />} />
            <Route path="new" element={<PostCreate />} />
            <Route path=":id" element={<Post />} />
          </Route>

          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      </PostsProvider>
    </Router>
  );
}
