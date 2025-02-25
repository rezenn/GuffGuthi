import React, { useState, useEffect } from "react";
import api from "../../api";
import GroupPostContent from "./groupPostContext";
import "./groupPost.css";
import { useNavigate, useParams } from "react-router-dom";
import likeIcon from "../../assets/star (1).png";
import likedIcon from "../../assets/star.png";
import commentIcon from "../../assets/message.png";
import sendIcon from "../../assets/send-2.svg";

function GroupPost() {
  const { groupId } = useParams();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(""); // URL for display
  const [isFetching, setIsFetching] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [likedPosts, setLikedPosts] = useState({}); // Track likes
  const [comments, setComments] = useState({}); // Track comments
  const [newComments, setNewComments] = useState({}); // Track new comment text
  const [showComments, setShowComments] = useState({}); // Track comment visibility

  const navigate = useNavigate();

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

  // Fetch posts for the group
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/groupFeed/${groupId}`);
        setPosts(response.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Failed to fetch posts. Please try again.");
      }
    };

    fetchPosts();
  }, [groupId]); // Ensure groupId is in dependencies

  // Toggle like for a post
  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  };

  // Toggle comment visibility
  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    if (!comments[postId]) {
      fetchComments(postId);
    }
  };

  // Fetch comments for a post
  const fetchComments = async (postId) => {
    try {
      const response = await api.get(`/groupPost/${postId}/comments`);
      setComments((prev) => ({
        ...prev,
        [postId]: response.data || [],
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Handle comment input change
  const handleCommentChange = (postId, text) => {
    setNewComments((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  // Post a new comment
  const handlePostComment = async (postId) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/groupPost/${postId}/comments`,
        { content: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update comments state with new comment
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), response.data],
      }));

      // Clear the input field
      setNewComments((prev) => ({
        ...prev,
        [postId]: "",
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Share post functionality
  const sharePost = async (postId) => {
    const postUrl = `${window.location.origin}/groupPost/${postId}`;

    try {
      await navigator.clipboard.writeText(postUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Failed to copy link. Please try again.");
    }
  };

  if (isFetching) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Error message
  }

  return (
    <>
      {posts.map((post) => (
        <div className="card" key={post.id}>
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
          <div className="card-title">
            {post.group_post_title || "Untitled Post"}
          </div>
          {post.img && (
            <img
              className="postImg"
              src={`http://localhost:8000${post.img}`}
              alt="Post visual content"
            />
          )}
          <div className="card-content">
            <GroupPostContent
              htmlContent={post.group_post_desc || "No description provided."}
            />
          </div>
          <div className="card-footer">
            <div className="actions">
              <span onClick={() => toggleLike(post.id)}>
                <img
                  className="icon"
                  src={likedPosts[post.id] ? likeIcon : likedIcon}
                  alt="like"
                />
                {post.likes}
              </span>
              <span onClick={() => toggleComments(post.id)}>
                <img className="icon" src={commentIcon} alt="comment" />
                {comments[post.id]?.length || post.comments}
              </span>
              <span onClick={() => sharePost(post.id)}>
                <img className="icon" src={sendIcon} alt="share" />
              </span>
            </div>
          </div>

          {/* Comments Section */}
          {showComments[post.id] && (
            <div className="comments-section">
              <div className="comments-list">
                {comments[post.id]?.map((comment, index) => (
                  <div key={index} className="comment">
                    <img
                      className="comment-profile"
                      src={
                        comment.profilepic
                          ? `http://localhost:8000${comment.profilepic}`
                          : "./src/assets/profile.jpg"
                      }
                      alt="Profile"
                    />
                    <div className="comment-content">
                      <strong>{comment.username}</strong>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="add-comment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComments[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                />
                <button
                  className="post-comment-btn"
                  onClick={() => handlePostComment(post.id)}
                  disabled={!newComments[post.id]?.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default GroupPost;
