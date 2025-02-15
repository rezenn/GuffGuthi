import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./userCoverImage.css"; // Ensure this CSS file exists
import coverPicture from "../../assets/SwayambuCover.jpg";

function UserCoverImage() {
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No logged-in user found.");
      setIsFetching(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/user/profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isFetching) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Error message
  }

  return (
    <div className="cover-image-container">
      <img
        className="cover-image"
        src={
          userData.coverpic
            ? `http://localhost:8000${userData.coverpic}`
            : coverPicture
        }
        alt="Cover image"
      />
    </div>
  );
}

export default UserCoverImage;
