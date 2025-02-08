// import React, { useState, useEffect } from "react";
// import api from "../../api";
// import PostContent from "./PostContent";
// import "./post.css";

// function Post() {
//   const [posts, setPosts] = useState([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState(""); // URL for display
//   const [isFetching, setIsFetching] = useState(true); // Loading state
//   const [error, setError] = useState(""); // Error state

//   // Fetch user data (username and profile image)
//   useEffect(() => {
//     const loggedInEmail = localStorage.getItem("email");
//     const token = localStorage.getItem("token");

//     if (!loggedInEmail || !token) {
//       alert("No logged-in user found.");
//       setIsFetching(false);
//       return;
//     }

//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/user/${loggedInEmail}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user info");
//         }
//         const userData = await response.json();
//         setUsername(userData.user_name || "");
//         setProfileImage(userData.profilepic || "");
//       } catch (error) {
//         console.error(error.message);
//         setError("Failed to fetch user data. Please try again.");
//       } finally {
//         setIsFetching(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // Fetch posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await api.get("/post");
//         setPosts(response.data || []);
//       } catch (err) {
//         console.error("Error fetching posts:", err.message);
//         setError("Failed to fetch posts. Please try again.");
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (isFetching) {
//     return <p>Loading...</p>; // Loading indicator
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>{error}</p>; // Error message
//   }

//   return (
//     <>
//       {posts.map((post, index) => (
//         <div className="card" key={post.id || index}>
//           <div className="card-header">
//             <img
//               className="profile"
//               src={
//                 profileImage
//                   ? `http://localhost:8000${profileImage}`
//                   : "./src/assets/profile.jpg"
//               }
//               alt="Profile"
//             />
//             <div className="author">
//               <p>{username}</p> {/* Dynamic username */}
//             </div>
//           </div>
//           <div className="card-title">{post.post_title || "Untitled Post"}</div>
//           {post.img && (
//             <img
//               className="postImg"
//               src={`http://localhost:8000${post.img}`}
//               alt="Post visual content"
//             />
//           )}
//           <div className="card-content">
//             <PostContent
//               htmlContent={post.post_desc || "No description provided."}
//             />
//           </div>
//           <div className="card-footer">
//             <div className="actions">
//               <span>
//                 <img
//                   className="icon"
//                   src="./src/assets/star (1).png"
//                   alt="like"
//                 />
//                 {post.likes || 0}
//               </span>
//               <span>
//                 <img
//                   className="icon"
//                   src="./src/assets/message.png"
//                   alt="comment"
//                 />
//                 {post.comments || 0}
//               </span>
//               <span>
//                 <img className="icon" src="./src/assets/send.png" alt="share" />
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// export default Post;

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
        console.error(error.message);
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
              <p>{username}</p>
            </div>
          </div>
          <div className="card-title">{post.post_title || "Untitled Post"}</div>
          {post.img && (
            <img
              className="postImg"
              src={`http://localhost:8000${post.img}`}
              alt="Post"
            />
          )}
          <div className="card-content">
            <PostContent
              htmlContent={post.post_desc || "No description provided."}
            />
          </div>
          <div className="card-footer">
            <div className="actions">
              <span
                onClick={() => handleLike(post.id, index)}
                style={{ cursor: "pointer" }}
              >
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
