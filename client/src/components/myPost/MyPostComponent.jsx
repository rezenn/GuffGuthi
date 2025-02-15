import { useEffect, useState } from "react";
import styles from "./myPost.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostContent from "../postINhome/PostContent";

function MyPostComponent() {
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
                />{" "}
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
