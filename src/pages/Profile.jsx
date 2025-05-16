import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getUserPosts } from "../util/api";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, token } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        const posts = await getUserPosts(token);
        setUserPosts(posts);
      } catch (error) {
        console.error("Failed to load user posts:", error);
      }
    };

    if (token) {
      loadUserPosts();
    }
  }, [token]);

  if (!user) return <p className="p-6 font-montserrat">Loading...</p>;

  return (
    <div className="max-w-[1440px] mx-auto px-2 py-5 flex flex-col">
      <div className="max-w-[1440px] px-[100px] mx-auto pt-20">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link to="/app/posts" className="text-sm text-dark hover:text-primary">
            ← Back to all posts
          </Link>
        </div>
  
        {/* Profile Heading */}
        <h1 className="text-3xl font-extrabold font-montserrat text-dark mb-8">
          My Profile
        </h1>
  
        {/* Profile Info */}
        <div className="flex flex-col md:flex- md:items-start gap-8 mb-10">
          <img
            src={user.avatar_url || "/icons/empty_avatar.png"}
            alt="User avatar"
            className="w-36 h-36 object-cover rounded-full border border-gray-300 shadow"
          />
          <div className="space-y-2">
            <p className="text-xl font-semibold font-montserrat text-dark">
              {user.username}
            </p>
            <p className="text-sm font-montserrat text-gray-600">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-sm font-montserrat text-gray-600">
              {user.email}
            </p>
            <p className="text-sm font-montserrat text-gray-600">
              Phone: {user.phone_number}
            </p>
            <p className="text-sm font-montserrat text-gray-600">
              ZIP Code: {user.zip_code}
            </p>
            <button
              className="mt-4 bg-dark text-white rounded-[14px] px-[20px] py-[10px] font-montserrat text-sm hover:bg-secondary hover:text-dark transition-colors"
              onClick={() => navigate("/app/profile/edit")}
            >
              Edit Profile
            </button>
          </div>
        </div>
  
        {/* User Posts */}
        <h2 className="text-2xl font-bold font-montserrat text-dark mb-4">
          My Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard
                key={post.item_id}
                post={post}
                onClick={() =>
                  navigate(`/app/posts/${post.item_id}`, {
                    state: { backgroundLocation: location },
                  })
                }
              />
            ))
          ) : (
            <p className="text-gray-500 font-montserrat">
              You haven't posted anything yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}