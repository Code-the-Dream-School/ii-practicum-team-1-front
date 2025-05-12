import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostsContext";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { id } = useParams();
  const { getPost, currentPost, posts, isLoading, error } = usePosts();

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const selectedPhoto =
    (Array.isArray(currentPost?.photos)
      ? currentPost.photos[selectedPhotoIndex]
      : currentPost?.photo) || null;

  useEffect(() => {
    console.log("PostPage - ID param:", id);
    getPost(Number(id));
  }, [id, getPost]);

  console.log("PostPage - currentPost:", currentPost);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentPost?.item_id) return <p>Post not found</p>;

  const relatedPosts = Array.isArray(posts)
  ? posts.filter(
      (post) =>
        post.category === postData.category &&
        post.item_id !== postData.item_id
    )
  : [];

  return (
    <div className="max-w-[1440px] mx-auto px-4  py-5 flex flex-col">
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
            More in {currentPost.category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {relatedPosts.map((post) => (
              <Link key={post.item_id} to={`/app/posts/view/${post.item_id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
