import { useEffect, useState } from "react";
import styles from "./myPost.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostContent from "../postINhome/PostContent";

function MyPostComponent() {
  const [userPosts, setUserPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [newComments, setNewComments] = useState({}); // Track new comment text for each post
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No logged-in user found.");
      setIsFetching(false);
      return;
    }

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/post/loggedIn`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserPosts();
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
      const response = await axios.get(`/post/${postId}/comments`);
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
      const response = await axios.post(
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

  return (
    <>
      <div className={styles.ViewPost}>
        <div className={styles.postContainer}>
          {isFetching ? (
            <p>Loading...</p>
          ) : userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post.post_id} className={styles.card}>
                <h3>{post.post_title}</h3>
                {post.img && (
                  <img
                    className={styles.postImg}
                    src={`http://localhost:8000${post.img}`}
                    alt="Post visual content"
                  />
                )}
                <PostContent
                  htmlContent={post.post_desc || "No description provided."}
                />
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
                      {post.likes}
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
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyPostComponent;
