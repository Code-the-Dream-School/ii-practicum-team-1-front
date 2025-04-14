import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostsContext";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, currentPost, isLoading, error } = usePosts();
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

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-4xl p-16 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 p-2 hover:bg-primary/20 rounded-full transition-colors"
        >
          <img
            src="/icons/close.svg"
            alt="Close"
            className="w-6 h-6 hover:filter hover:brightness-0 hover:invert-[40%] hover:sepia hover:hue-rotate-[60deg]"
          />
        </button>

        {/* Left side: Image */}
        <div className="flex flex-col items-center">
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt={currentPost.title}
              className="w-full h-auto rounded-xl"
            />
          )}

          {currentPost.photos?.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {currentPost.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${currentPost.title} - ${index + 1}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                    photo === selectedPhoto
                      ? "border-primary border-2"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right side: Text info */}
        <div>
          <h2 className="text-4xl md:text-3xl font-extrabold font-montserrat text-primary mb-2">
            {currentPost.title}
          </h2>

          <div className="mb-6">
            <p className="text-base  text-gray ">{currentPost.category}</p>
          </div>

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
            <h3 className="text-lg font-semibold mb-2">Giver Information:</h3>

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
    </div>
  );
}
