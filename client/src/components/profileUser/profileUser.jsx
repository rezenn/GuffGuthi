import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./profileUser.module.css";
import locationIcon from "../../assets/location-pointer.png";
import profilePicture from "../../assets/profile.jpg";

function ProfileUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/user/profile/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <>
      <section className={styles.profileSection}>
        <div className={styles.profileImg}>
          <img
            className={styles.profile}
            src={
              userData.profilepic
                ? `http://localhost:8000${userData.profilepic}`
                : profilePicture
            }
            alt="User Profile"
          />
        </div>
        <div className={styles.intro}>
          <div className={styles.name}>
            <p>{userData.user_name}</p>
          </div>
          <div>
            <pre className={styles.bio}>{userData.bio || "Bio"}</pre>
            <br />
            <p className={styles.Ocupation}>
              {userData.occupation || "Occupation"}
            </p>
            <div className={styles.locationBlock}>
              <img
                className={styles.locationImg}
                src={locationIcon}
                alt="location pin"
              />
              <p className={styles.LocationName}>
                {userData.location || "Location"}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.followShow}>
          <div>
            <p className={styles.followerCount}>10</p>
            <p className={styles.followers}>followers</p>
          </div>
          <div>
            <p className={styles.followingCount}>7</p>
            <p className={styles.following}>following</p>
          </div>
        </div>
        <button
          className={styles.followBtn}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </section>
    </>
  );
}

export default ProfileUser;
