import React, { useState, useEffect } from "react";
import api from "../../api";
import PostContent from "./PostContent";
import Comment from "../comments/Comment";
import "./post.css";

function Post() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showComments, setShowComments] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInEmail = localStorage.getItem("email");
        if (!loggedInEmail || !token) {
          alert("No logged-in user found.");
          setIsFetching(false);
          return;
        }

        const response = await api.get(`/user/${loggedInEmail}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(response.data.user_name);
        setProfileImage(response.data.profilepic);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setError("Failed to fetch user data.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserData();
  }, [token]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/post");
        setPosts(response.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Failed to fetch posts.");
      }
    };
    fetchPosts();
  }, []);

  // Handle comment toggle
  const handleCommentClick = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  // Handle Like Toggle
  const handleLike = async (postId, index) => {
    try {
      const response = await api.post(
        `/post/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update like count in UI
      setPosts((prevPosts) =>
        prevPosts.map((post, i) =>
          i === index
            ? {
                ...post,
                likes: response.data.liked ? post.likes + 1 : post.likes - 1,
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err.message);
    }
  };

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      {posts.map((post, index) => (
        <div className="card" key={post.post_id}>
          {/* Post Header */}
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
              <p>{username}</p>
            </div>
          </div>

          {/* Post Title */}
          <div className="card-title">{post.post_title || "Untitled Post"}</div>

          {/* Post Image */}
          {post.img && (
            <img
              className="postImg"
              src={`http://localhost:8000${post.img}`}
              alt="Post"
            />
          )}

          {/* Post Content */}
          <div className="card-content">
            <PostContent
              htmlContent={post.post_desc || "No description provided."}
            />
          </div>

          {/* Post Actions */}
          <div className="card-footer">
            <div className="actions">
              {/* Like Button */}
              <span
                onClick={() => handleLike(post.post_id, index)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="icon"
                  src="./src/assets/star (1).png"
                  alt="like"
                />
                {post.likes || 0}
              </span>

              {/* Comment Button */}
              <span
                onClick={() => handleCommentClick(post.post_id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="icon"
                  src="./src/assets/message.png"
                  alt="comment"
                />
                {post.comments || 0}
              </span>

              {/* Show Comments Section */}
              {showComments[post.post_id] && <Comment postId={post.post_id} />}

              {/* Share Button */}
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
