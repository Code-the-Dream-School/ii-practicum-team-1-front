import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostsContext";
import Post from "./Post";

export default function PostModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPost, currentPost, isLoading, error } = usePosts();

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const selectedPhoto =
    (Array.isArray(currentPost?.photos)
      ? currentPost.photos[selectedPhotoIndex]
      : currentPost?.photo) || null;

  useEffect(() => {
    console.log("PostModal - ID param:", id);
    getPost(Number(id));
  }, [id, getPost]);

  console.log("PostModal - currentPost:", currentPost);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentPost?.item_id) return <p>Post not found</p>;

  return (
    <div className="fixed inset-0 p-4 sm:p-8 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#243311] opacity-85 -z-10"></div>
      <div
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 p-2 hover:bg-primary/20 rounded-full transition-colors"
        >
          <img src="/icons/close.svg" alt="Close" className="w-6 h-6" />
        </button>

        <div className="p-8">
          <Post
            key={currentPost.item_id}
            post={currentPost}
            selectedPhoto={selectedPhoto}
            setSelectedPhotoIndex={setSelectedPhotoIndex}
          />
        </div>
      </div>
    </div>
  );
}
