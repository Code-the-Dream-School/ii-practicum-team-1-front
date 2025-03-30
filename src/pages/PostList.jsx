import React from "react";
import { usePosts } from "../context/PostsContext";

const PostList = () => {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div>
      <h1>Post List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.item_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <h2>{post.title}</h2>
            <p><strong>Description:</strong> {post.description}</p>
            <p><strong>Category:</strong> {post.category}</p>
            <p><strong>Location:</strong> {post.location}</p>
            <p><strong>Status:</strong> {post.iyrm_status}</p>
            <div>
              <strong>Photos:</strong>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                {post.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${post.title} - ${index + 1}`}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
