
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ activePage, setActivePage, setAuth }) => {
  const [profileImage, setProfileImage] = useState(""); // URL for display
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(""); // Error state
  const [name, setName] = useState(""); // User name state
  const navigate = useNavigate();

  // Fetch user data (profile image)
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
        setProfileImage(userData.profilepic || ""); // Ensure the key matches the API response
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserData();
  }, []);

  // Fetch user name
  useEffect(() => {
    const getName = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token exists
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:8000/home", {
          method: "GET",
          headers: { token },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user name");
        }

        const parseRes = await response.json();
        setName(parseRes.user_name); // Expecting { user_name: 'Name' }
      } catch (err) {
        console.error(err.message);
      }
    };

    getName();
  }, []);

  // Handle navigation
  const handleNavigation = (page) => {
    setActivePage(page); // Update active page state
    navigate(`/${page}`); // Navigate to the route
  };

  if (isFetching) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; // Error message
  }

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <button
            id="searchButton"
            className={activePage === "search" ? "active" : ""}
            onClick={() => handleNavigation("search")}
          >
            <img
              src="./src/assets/search.svg"
              alt="search Icon"
              className="search_icon"
            />
          </button>

          <input type="text" className="search-input" placeholder="Search..." />

          <button 
          
          id="notification-button"
          className={activePage === "notification" ? "active" : ""}
          onClick={() => handleNavigation("notification")}
          >


            <img
              src="./src/assets/notification.svg"
              alt="notification Icon"
              className="notification_icon"
            />
            Notification
          </button>

          <button
            id="post-button"
            className={activePage === "createPost" ? "active" : ""}
            onClick={() => handleNavigation("createPost")}
          >
            <img
              src="./src/assets/s_post.svg"
              alt="post Icon"
              className="Post_icon"
            />
            Post
          </button>

          <button
            id="profile"
            className={activePage === "viewProfile" ? "active" : ""}
            onClick={() => handleNavigation("viewProfile")}
          >
            <img
              src={
                profileImage
                  ? `http://localhost:8000${profileImage}`
                  : "./src/assets/profile.jpg"
              }
              alt="profile"
              className="profile"
            />
          </button>
        </div>
      </div>

      <div className="navbar">
        <div className="navbar-logo">
          <img src="./src/assets/logo.png" alt="Logo" />
        </div>
        <span className="username"> Hello, {name}</span>

        <div className="navbar-Line">
          <hr></hr>
        </div>

        <button
          id="homeButton"
          className={activePage === "home" ? "active" : ""}
          onClick={() => handleNavigation("home")}
        >
          <img
            src="./src/assets/homebutton1.svg"
            alt="Home Icon"
            className="icon"
          />
          Home
        </button>

        <button
          id="popularButton"
          className={activePage === "guthi" ? "active" : ""}
          onClick={() => handleNavigation("guthi")}
        >
          <img
            src="./src/assets/popularbutton.svg"
            alt="Group Icon"
            className="Popular_icon"
          />
          Guthi
        </button>
        <button
          id="GuthiyarButton"
          className={activePage === "guthiyar" ? "active" : ""}
          onClick={() => handleNavigation("guthiyar")}
        >
          <img
            src="./src/assets/profile-2user.svg"
            alt="guthiyar Icon"
            className="guthiyar_icon"
          />
          Guthiyar
        </button>

        <button
          id="myPostsButton"
          className={activePage === "my-posts" ? "active" : ""}
          onClick={() => handleNavigation("my-posts")}
        >
          <img
            src="./src/assets/myPost.svg"
            alt="my post Icon"
            className="MyPost_icon"
          />
          My Posts
        </button>

        <button
          id="requestsButton"
          className={activePage === "communityServices" ? "active" : ""}
          onClick={() => handleNavigation("communityServices")}
        >
          <img
            src="./src/assets/request.svg"
            alt="request Icon"
            className="request_icon"
          />
          Community Services
        </button>

        <button
          id="chatButton"
          className={activePage === "chat" ? "active" : ""}
          onClick={() => handleNavigation("chat")}
        >
          <img
            src="./src/assets/chats.svg"
            alt="chats Icon"
            className="chat_icon"
          />
          Chat
        </button>

        <button
          id="createGroupButton"
          className={activePage === "createGroup" ? "active" : ""}
          onClick={() => handleNavigation("createGroup")}
        >
          <img
            src="./src/assets/group.svg"
            alt="group Icon"
            className="group_icon"
          />
          Create Group
        </button>

        <button
          id="settingsButton"
          className={activePage === "settings" ? "active" : ""}
          onClick={() => handleNavigation("settings")}
        >
          <img
            src="./src/assets/settings.svg"
            alt="setting Icon"
            className="settings_icon"
          />
          Settings
        </button>

        <div className="settingANDhelp-Line">
          <hr></hr>
        </div>

        <button
          id="aboutButton"
          className={activePage === "about" ? "active" : ""}
          onClick={() => handleNavigation("about")}
        >
          <img
            src="./src/assets/about.svg"
            alt="about Icon"
            className="about_icon"
          />
          About
        </button>
      </div>
    </>
  );
};

export default Navbar;
