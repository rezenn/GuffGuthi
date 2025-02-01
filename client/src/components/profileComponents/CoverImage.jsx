import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./coverImage.css";

function CoverImage() {
  const [coverImage, setCoverImage] = useState(""); // URL for display
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(""); // Error state

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
        setCoverImage(userData.coverpic || "");
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserData();
  }, []);
  if (isFetching) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (error) {
    return <p className={styles.error}>{error}</p>; // Error message
  }

  return (
    <>
      <div>
        <img
          src={
            coverImage
              ? `http://localhost:8000${coverImage}`
              : "./src/assets/SwayambuCover.jpg"
          }
          alt="Cover image"
        />
      </div>
    </>
  );
}
//
export default CoverImage;
