import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";

export default function Profile() {
  const { user } = useAuth();
  const { posts } = usePosts();

  if (!user) return <p className="p-6 font-montserrat">Loading...</p>;

  const userPosts = posts.filter((post) => post.username === user.username);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-3xl font-extrabold font-montserrat text-dark mb-8">
          My Profile
        </h1>

        <div className="flex flex-col md:flex-row md:items-start gap-8 mb-10">
          {/* Avatar + Info */}
          <img
            src={user.avatar || "https://i.pravatar.cc/150?img=3"}
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
              onClick={() => console.log("Edit profile clicked")}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Posts section */}
        <h2 className="text-2xl font-bold font-montserrat text-dark mb-4">
          My Items
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div
                key={post.item_id}
                className="bg-[#F2F3F4] p-4 rounded-xl border border-gray-200 shadow-sm"
              >
                <img
                  src={post.photos?.[0] || "/images/fallback.jpg"}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-semibold text-dark font-montserrat">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 font-montserrat">
                  {post.category}
                </p>
              </div>
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
