import React, { useState, useEffect } from "react";
import api from "../../api"; // This should be the API instance for making requests
import PostContent from "./PostContent"; // Import PostContent to display HTML content
import "./post.css";

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/post"); // Assuming api instance is configured to communicate with the backend
        setPosts(response.data || []); // Ensure it defaults to an empty array if no posts
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <div className="card" key={post.id || index}>
          <div className="card-header">
            <img
              src={post.profilePic || "/path/to/default/avatar.png"} // Use a fallback avatar if the profilePic is missing
              alt="User Avatar"
              className="avatar"
            />
            <div className="author">{post.name || "Unknown User"}</div>
          </div>
          <div className="card-title">{post.post_title || "Untitled Post"}</div>
          {post.img && (
            <img
              className="postImg"
              src={`http://localhost:8000/uploads/${post.img}`}
              alt="Post visual content"
            />
          )}
          <div className="card-content">
            <PostContent
              htmlContent={post.post_desc || "No description provided."} // Fallback description
            />
          </div>
          <div className="card-footer">
            <div className="actions">
              <span>
                <img
                  className="icon"
                  src="./src/assets/star (1).png"
                  alt="like"
                />
                {post.likes || 0}
              </span>
              <span>
                <img
                  className="icon"
                  src="./src/assets/message.png"
                  alt="comment"
                />
                {post.comments || 0}
              </span>
              <span>
                <img className="icon" src="./src/assets/send.png" alt="share" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Post;
