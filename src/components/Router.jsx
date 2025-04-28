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
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

function RedirectLogic({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuthPage = ["/login", "/register", "/forgot-password", "/reset-password"].includes(location.pathname);
  const isAppPage = location.pathname.startsWith("/app");

  if (user && (isLanding || isAuthPage)) {
    return <Navigate to="/app/posts" replace />;
  }

  if (!user && isAppPage) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


export default function AppRouter() {
  return (
    <Router>
      <Navbar />
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

             {/* <Route path="/dev-postcreate" element={<PostCreate />} /> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
    </Router>
  );
}
