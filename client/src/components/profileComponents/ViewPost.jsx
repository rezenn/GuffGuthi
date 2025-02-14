import { useEffect, useState } from "react";
import styles from "./ViewPost.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostContent from "../postINhome/PostContent";

function ViewPost() {
  const [userPosts, setUserPosts] = useState([]);
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
        const response = await axios.get("http://localhost:8000/post/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <div className={styles.ViewPost}>
      <h2>User Posts</h2>
      <hr />
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
              />{" "}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewPost;
