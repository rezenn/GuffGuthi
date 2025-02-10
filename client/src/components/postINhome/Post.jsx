import React, { useState, useEffect } from "react";
import api from "../../api";
import PostContent from "./PostContent";
import "./post.css";

function Post() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(""); // URL for display
  const [isFetching, setIsFetching] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch user data (username and profile image)
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!loggedInEmail || !token) {
      alert("No logged-in user found.");
      setIsFetching(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/user/${loggedInEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const userData = await response.json();
        setUsername(userData.user_name || "");
        setProfileImage(userData.profilepic || "");
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserData();
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/post");
        setPosts(response.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Failed to fetch posts. Please try again.");
      }
    };

    fetchPosts();
  }, []);

  if (isFetching) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Error message
  }

  return (
    <>
      {posts.map((post, index) => (
        <div className="card" key={post.id || index}>
          <div className="card-header">
            <img
              className="profile"
              src={
                profileImage
                  ? `http://localhost:8000${profileImage}`
                  : "./src/assets/profile.jpg"
              }
              alt="Profile"
            />
            <div className="author">
              <p>{username}</p> {/* Dynamic username */}
            </div>
          </div>
          <div className="card-title">{post.post_title || "Untitled Post"}</div>
          {post.img && (
            <img
              className="postImg"
              src={`http://localhost:8000${post.img}`}
              alt="Post visual content"
            />
          )}
          <div className="card-content">
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
