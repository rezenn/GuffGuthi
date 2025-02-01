import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // For making API requests
import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  // State for form fields
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [occupation, setOccupation] = useState("");
  const [location, setLocation] = useState("");

  // State for profile and cover images
  const [profileImageFile, setProfileImageFile] = useState(null); // File object for upload
  const [profileImage, setProfileImage] = useState(""); // URL for display
  const [coverImageFile, setCoverImageFile] = useState(null); // File object for upload
  const [coverImage, setCoverImage] = useState(""); // URL for display

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  // Refs for file inputs
  const fileInputRefProfile = useRef(null);
  const fileInputRefCover = useRef(null);

  // Handle profile image upload
  const handleButtonClickProfile = () => {
    fileInputRefProfile.current.click(); // Trigger the hidden file input
  };

  const handleImageChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
      setProfileImageFile(file); // Store the file object for upload
      setProfileImage(imageUrl); // Store the URL for display
    }
  };

  // Handle cover image upload
  const handleButtonClickCover = () => {
    fileInputRefCover.current.click(); // Trigger the hidden file input
  };

  const handleImageChangeCover = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
      setCoverImageFile(file); // Store the file object for upload
      setCoverImage(imageUrl); // Store the URL for display
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!loggedInEmail || !token) {
      alert("No logged in user found. Please log in.");
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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("user_name", username);
      formData.append("bio", bio);
      formData.append("occupation", occupation);
      formData.append("location", location);
      formData.append("profilePic", profileImageFile);
      formData.append("coverPhoto", coverImageFile);

      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const response = await fetch(`http://localhost:8000/user/${email}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user profile");
      }

      alert("User profile updated!");
      navigate("/viewProfile");
    } catch (error) {
      console.error(error.message);
      setError(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.editProfile}>
      <h1>Edit profile</h1>
      {isFetching ? (
        <p>Loading user data...</p>
      ) : (
        <>
          <div className={styles.profile}>
            <p>Change profile</p>
            <img
              className={styles.profileImg}
              src={
                profileImageFile
                  ? URL.createObjectURL(profileImageFile)
                  : profileImage
                  ? `http://localhost:8000${profileImage}`
                  : "./src/assets/profile.jpg"
              }
              alt="Profile"
            />
            <button
              type="button"
              className={styles.changeProfile}
              onClick={handleButtonClickProfile}
            >
              Change profile
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefProfile}
              onChange={handleImageChangeProfile}
              style={{ display: "none" }}
            />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={styles.introContainer}>
                <label>Username</label>
                <br />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Bio</label>
                <br />
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <br />
                <label>Occupation</label>
                <br />
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
                <br />
                <label>Change location</label>
                <br />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <br />
                <label>Cover image</label>
                <img
                  className={styles.coverImg}
                  src={
                    coverImageFile
                      ? URL.createObjectURL(coverImageFile)
                      : coverImage
                      ? `http://localhost:8000${coverImage}`
                      : "./src/assets/SwayambuCover.jpg"
                  }
                  alt="cover image"
                />
                <button
                  type="button"
                  className={styles.changeCover}
                  onClick={handleButtonClickCover}
                >
                  Change cover
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefCover}
                  onChange={handleImageChangeCover}
                  style={{ display: "none" }}
                />
              </div>
              <br />
              <button
                type="submit"
                className={styles.updateProfile}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update profile"}
              </button>
              {error && <p className={styles.error}>{error}</p>}
            </form>
          </div>
        </>
      )}
    </section>
  );
}

export default EditProfile;
