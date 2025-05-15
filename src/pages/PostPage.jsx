import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostsContext";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { id } = useParams();
  const { getPost, currentPost, isLoading, error } = usePosts();

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const selectedPhoto =
    (Array.isArray(currentPost?.photos)
      ? currentPost.photos[selectedPhotoIndex]
      : currentPost?.photo) || null;

  useEffect(() => {
    console.log("PostPage - loading post with ID:", id);
    getPost(Number(id));
  }, [id, getPost]);

  useEffect(() => {
    if (!currentPost?.item_id || !currentPost?.category_name) {
      console.log("Current post not ready yet, skipping fetch.");
      return;
    }

    const currentCategory = currentPost.category_name;
    console.log("Fetching related posts for category:", currentCategory);

    fetch(`${import.meta.env.VITE_API_URL}/items?category=${currentCategory}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched posts by category:", data);

        if (!Array.isArray(data.items)) {
          console.error("Expected 'items' to be an array but got:", data);
          return;
        }

        const filtered = data.items.filter(
          (post) =>
            post.item_id !== currentPost.item_id &&
            post.category_name === currentCategory
        );

        console.log("Filtered related posts (excluding current):", filtered);
        setRelatedPosts(filtered);
      })
      .catch((error) => {
        console.error("Failed to load related posts", error);
      });
  }, [currentPost]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentPost?.item_id) return <p>Post not found</p>;

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-5 flex flex-col">
      <div className="mb-6">
        <Link to="/app/posts" className="text-sm text-dark hover:text-primary">
          ← Back to all posts
        </Link>
      </div>

      <Post
        post={currentPost}
        selectedPhoto={selectedPhoto}
        setSelectedPhotoIndex={setSelectedPhotoIndex}
      />

      {relatedPosts.length > 0 && (
        <div className="mt-28">
          <h3 className="text-2xl font-bold mb-4">
            More in {currentPost.category_name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {relatedPosts.map((post) => (
              <Link key={post.item_id} to={`/app/posts/${post.item_id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
