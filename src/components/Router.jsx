import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PostCreate from "../pages/PostCreate";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import AppLayout from "./AppLayout";
import PostList from "../pages/PostList";
import PostModal from "./PostModal";
import PostPage from "../pages/PostPage";
import PrivateRoute from "./PrivateRoute";
import PostsLayout from "./PostsLayout";
import PostEditDelete from "../pages/PostEditDelete";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import ProfileEdit from "../pages/ProfileEdit";
import VerifyEmail from "../pages/VerifyEmail";
import { PostsProvider } from "../context/PostsContext";

function RedirectLogic({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  const isLanding = location.pathname === "/";
  const isAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ].includes(location.pathname);
  const isAppPage = location.pathname.startsWith("/app");

  const isCheckingAuth = user === null && localStorage.getItem("token");
  if (isCheckingAuth) return null;

  if (user && (isLanding || isAuthPage)) {
    return <Navigate to="/app/posts" replace />;
  }

  if (!user && isAppPage) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRouter() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <RedirectLogic>
      <Navbar />

      <Routes location={backgroundLocation || location}>
        <Route index element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="app"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate replace to="posts" />} />
          <Route
            path="posts"
            element={
              <PostsProvider>
                <PostsLayout />
              </PostsProvider>
            }
          >
            <Route index element={<PostList />} />
            <Route path="new" element={<PostCreate />} />
            <Route path=":id" element={<PostPage />} />
            <Route path=":id/edit" element={<PostEditDelete />} />
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>


      {backgroundLocation && backgroundLocation !== location && (
        <PostsProvider>
          <Routes>
            <Route path="/app/posts/:id" element={<PostModal />} />
          </Routes>
        </PostsProvider>
      )}
    </RedirectLogic>
  );
}
