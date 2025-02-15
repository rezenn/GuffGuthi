import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./postUser.module.css";
import PostContent from "../postINhome/PostContent";

function PostUser() {
  const [userPosts, setUserPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { userId } = useParams();
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
          `http://localhost:8000/post/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        alert("Failed to load posts. Please try again later.");
      } finally {
        setIsFetching(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  return (
    <div className={styles.ViewPost}>
      <h2>User Posts</h2>
      <hr />
      <div className={styles.postContainer}>
        {isFetching ? (
          <div className="loading-spinner">Loading...</div>
        ) : userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.post_id} className={styles.card}>
              <h3>{post.post_title}</h3>
              {post.img && (
                <img
                  className={styles.postImg}
                  src={`http://localhost:8000${post.img}`}
                  alt="Post"
                />
              )}
              <PostContent
                htmlContent={post.post_desc || "No description provided."}
              />
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default PostUser;
