import React, { useState, useEffect } from "react";
import api from "../../api";
import "./post.css";

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/post"); // Use the correct endpoint
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <div className="card-header">
            <img src={post.profilePic} alt="User Avatar" className="avatar" />
            <div className="author">{post.name}</div>
          </div>
          {/* <div className="card-title">{post.desc}</div> */}
          <div className="card-img">
          </div>
          <div className="card-title">{post.post_title}</div>
          <img className="postImg" src={post.img} alt="post image" />
          <div className="card-content">{post.post_desc}</div>
          <div className="card-footer">
            <div className="actions">
              <span>
                <img className="icon" src="./src/assets/star (1).png" alt="like" />
                {post.likes || 0}
              </span>
              <span>
                <img className="icon" src="./src/assets/message.png" alt="comment" />
                {post.comments || 0}
              </span>
              <span>
                <img className="icon" src="./src/assets/send.png" alt="share" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
