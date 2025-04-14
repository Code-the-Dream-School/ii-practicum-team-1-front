import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, currentPost, posts, isLoading, error } = usePosts();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    getPost(Number(id));
  }, [id, getPost]);

  useEffect(() => {
    if (currentPost?.photos?.length > 0) {
      setSelectedPhoto(currentPost.photos[0]);
    }
  }, [currentPost]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentPost?.item_id) return <p>Post not found</p>;

  const relatedPosts = posts.filter(
    (post) =>
      post.category === currentPost.category &&
      post.item_id !== currentPost.item_id
  );

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-10">
      <div className="flex w-full">
        <aside className="hidden lg:block w-64 shrink-0"></aside>

        <div className="flex flex-col w-full">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              to="/app/posts"
              className="text-sm text-dark hover:text-primary"
            >
              ← Back to all posts
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={selectedPhoto}
                  alt={currentPost.title}
                  className="w-full h-auto"
                />
              </div>
              {currentPost.photos?.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                  {currentPost.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${currentPost.title} - ${index + 1}`}
                      onClick={() => setSelectedPhoto(photo)}
                      className={`w-full h-20 object-cover rounded-lg cursor-pointer border ${
                        photo === selectedPhoto
                          ? "border-primary border-2"
                          : "border-gray"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
              <h2 className="text-4xl font-extrabold font-montserrat text-primary mb-2">
                {currentPost.title}
              </h2>
              <p className="text-base text-gray mb-6">{currentPost.category}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold">Details:</h3>
                <p>{currentPost.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold">Address to meet:</h3>
                <p>{currentPost.location}</p>
                <div className="w-full h-52 bg-gray-light rounded-xl flex items-center justify-center text-gray text-sm mt-4">
                  Map will be displayed here
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Giver Information:
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={currentPost.user?.avatar || "/icons/avatar.svg"}
                    alt={currentPost.user?.name || "User avatar"}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{currentPost.user?.name || "Unknown user"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <img src="/icons/email.svg" alt="Email" className="w-5 h-5" />
                  <span>{currentPost.user?.email || "No email provided"}</span>
                </div>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-28">
              <h3 className="text-2xl font-bold mb-4">
                More in {currentPost.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.item_id}
                    to={`/app/posts/${post.item_id}`}
                    className="flex flex-col"
                  >
                    <div className="rounded-2xl overflow-hidden border border-dark shadow-[0px_5px_0px_0px_var(--color-dark)] hover:border-secondary hover:shadow-[0px_5px_0px_0px_var(--color-secondary)] transition-all duration-200">
                      <img
                        src={post.photos?.[0] || ""}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="mt-2 px-1">
                      <h4 className="text-base font-semibold font-montserrat text-dark">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray">{post.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
