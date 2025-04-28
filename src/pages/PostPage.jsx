/* import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostsContext";
import { Link } from "react-router-dom";
import Post from "../components/Post";

export default function PostPage() {
  const { id } = useParams();
  const { getPost, currentPost, posts, isLoading, error } = usePosts();

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const selectedPhoto = currentPost?.photos?.[selectedPhotoIndex] || null;

  useEffect(() => {
    getPost(Number(id));
  }, [id, getPost]);

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
          <div className="mb-6">
            <Link
              to="/app/posts"
              className="text-sm text-dark hover:text-primary"
            >
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
 */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostsContext";
import { Link } from "react-router-dom";
import Post from "../components/Post";

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

  const relatedPosts = posts.filter(
    (post) =>
      post.category === currentPost.category &&
      post.item_id !== currentPost.item_id
  );

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 py-10">
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
              <Link key={post.item_id} to={`/app/posts/${post.item_id}`}>
                <div className="rounded-2xl overflow-hidden border shadow transition">
                  <img
                    src={post.photos?.[0] || post.photo || ""}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="mt-2 px-1">
                  <h4 className="text-base font-semibold text-dark">
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
  );
}
