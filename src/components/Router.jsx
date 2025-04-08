import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Landing from "../pages/Landing";
import LoginAndRegister from "../pages/LoginRegister";
import ResetPassword from "../pages/ResetPassword";
import PostCreate from "../pages/PostCreate";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import AppLayout from "./AppLayout";
import PostList from "../pages/PostList";
import PrivateRoute from "./PrivateRoute";


export default function AppRouter() {
  return (
    <Router>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/login" element={<LoginAndRegister />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route
                path="app"
                element={
                  <PrivateRoute>
                    <AppLayout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate replace to="posts" />} />

                <Route path="posts">
                  <Route index element={<PostList />} />
                  <Route path="new" element={<PostCreate />} />
                  <Route path=":id" element={<Post />} />
                </Route>

                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="/dev-postcreate" element={<PostCreate />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
    </Router>
  );
}
