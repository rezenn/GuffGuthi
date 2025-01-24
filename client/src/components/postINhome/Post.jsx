import React, { useState, useEffect } from "react";
import api from "../../api";
import PostContent from "./PostContent"; // Import the PostContent component
import "./post.css";

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/post");
        setPosts(response.data || []); // Ensure it defaults to an empty array
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
              src={post.profilePic || "/path/to/default/avatar.png"}
              alt="User Avatar"
              className="avatar"
            />
            <div className="author">{post.name || "Unknown User"}</div>
          </div>
          <div className="card-title">{post.post_title || "Untitled Post"}</div>
          {post.img && (
            <img className="postImg" src={post.img} alt="Post visual content" />
          )}
          <div className="card-content">
            {/* Use PostContent to render the post description */}
            <PostContent
              htmlContent={post.post_desc || "No description provided."}
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
