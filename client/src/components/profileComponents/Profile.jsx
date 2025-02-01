import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./profile.module.css";

function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");
  const [profileImage, setProfileImage] = useState(""); // URL for display
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
        setUsername(userData.user_name || "");
        setBio(userData.bio || "");
        setLocation(userData.location || "");
        setOccupation(userData.occupation || "");
        setProfileImage(userData.profilepic || "");
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

  const handleNavigate = () => {
    navigate("/EditProfile");
  };

  if (isFetching) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (error) {
    return <p className={styles.error}>{error}</p>; // Error message
  }

  return (
    <>
      <section className={styles.profileSection}>
        <div className={styles.profileImg}>
          <img
            className={styles.profile}
            src={
              profileImage
                ? `http://localhost:8000${profileImage}`
                : "./src/assets/profile.jpg"
            }
            alt="Profile"
          />
        </div>
        <div className={styles.intro}>
          <div className={styles.name}>
            <p>{username}</p> {/* Dynamic username */}
          </div>
          <div>
            <pre className={styles.bio}>{bio}</pre> {/* Dynamic bio */}
            <br />
            <p className={styles.Ocupation}>{occupation}</p>{" "}
            {/* Dynamic occupation */}
            <div className={styles.locationBlock}>
              <img
                className={styles.locationImg}
                src="./src/assets/location-pointer.png"
                alt="location pin"
              />
              <p className={styles.LocationName}>{location}</p>{" "}
              {/* Dynamic location */}
            </div>
          </div>
        </div>
        <div className={styles.followShow}>
          <div>
            <p className={styles.followerCount}>122</p>
            <p className={styles.followers}>followers</p>
          </div>
          <div>
            <p className={styles.followingCount}>67</p>
            <p className={styles.following}>following</p>
          </div>
          <div>
            <p className={styles.likeCount}>37K</p>
            <p className={styles.likes}>Likes</p>
          </div>
        </div>
        <button onClick={handleNavigate} className={styles.editProfile}>
          Edit Profile
        </button>
      </section>
    </>
  );
}

export default Profile;
