import React, { useState, useEffect } from "react";
import api from "../../api";
import PostContent from "./PostContent";
import "./post.css";

function Post() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComments, setNewComments] = useState({}); // Track new comment text for each post

  // Existing useEffects and other functions remain the same...
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/post");
        const fetchedPosts = response.data || [];
        const uniquePosts = [
          ...new Map(fetchedPosts.map((post) => [post.post_id, post])).values(),
        ];
        setPosts(uniquePosts);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Failed to fetch posts. Please try again.");
      }
    };

    fetchPosts();
  }, []);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    if (!comments[postId]) {
      fetchComments(postId);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await api.get(`/post/${postId}/comments`);
      setComments((prev) => ({
        ...prev,
        [postId]: response.data || [],
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (postId, text) => {
    setNewComments((prev) => ({
      ...prev,
      [postId]: text,
    }));
  };

  const handlePostComment = async (postId) => {
    const commentText = newComments[postId]?.trim();
    if (!commentText) return;

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/post/${postId}/comments`,
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

  const sharePost = async (postId) => {
    const postUrl = `${window.location.origin}/post/${postId}`;

    try {
      await navigator.clipboard.writeText(postUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      alert("Failed to copy link. Please try again.");
    }
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <div className="card" key={post.post_id}>
          <div className="card-header">
            <img
              className="profile"
              src={
                post.profilepic
                  ? `http://localhost:8000${post.profilepic}`
                  : "./src/assets/profile.jpg"
              }
              alt="Profile"
            />
            <div className="author">
              <p>{post.name}</p>
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
              <span onClick={() => toggleLike(post.post_id)}>
                <img
                  className="icon"
                  src={
                    likedPosts[post.post_id]
                      ? "./src/assets/star (1).png"
                      : "./src/assets/star.png"
                  }
                  alt="like"
                />
                {post.likes || 0}
              </span>
              <span onClick={() => toggleComments(post.post_id)}>
                <img
                  className="icon"
                  src="./src/assets/message.png"
                  alt="comment"
                />
                {comments[post.post_id]?.length || post.comments || 0}
              </span>
              <span onClick={() => sharePost(post.post_id)}>
                <img
                  className="icon"
                  src="./src/assets/send-2.svg"
                  alt="share"
                />
              </span>
            </div>
          </div>

          {/* Comments Section */}
          {showComments[post.post_id] && (
            <div className="comments-section">
              <div className="comments-list">
                {comments[post.post_id]?.map((comment, index) => (
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
                  value={newComments[post.post_id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post.post_id, e.target.value)
                  }
                />
                <button
                  className="post-comment-btn"
                  onClick={() => handlePostComment(post.post_id)}
                  disabled={!newComments[post.post_id]?.trim()}
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

export default Post;
