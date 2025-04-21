import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PostCreate from "../pages/PostCreate";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import AppLayout from "./AppLayout";
import PostList from "../pages/PostList";
import PrivateRoute from "./PrivateRoute";
import PostsLayout from "./PostsLayout";


export default function AppRouter() {
  return (
    <Router>
            <Routes>
              <Route index element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
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
                  {/* Routes with sidebar */}
                <Route element={<PostsLayout />}>
                  <Route index element={<PostList />} />
                  <Route path="new" element={<PostCreate />} />
                  <Route path=":id" element={<Post />} />
                </Route>
                </Route>

                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
    </Router>
  );
}