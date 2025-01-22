import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activePage, setActivePage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Search Bar */}
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
          <button className="notification-button">
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
            className={activePage === "viewProfilePage" ? "active" : ""}
            onClick={() => handleNavigation("viewProfilePage")}
          >
            <img
              src="./src/assets/profile.jpg"
              alt="profile"
              className="profile"
            />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`navbar ${sidebarOpen ? "open" : ""}`}>
        <div className="navbar-logo">
          <img src="./src/assets/logo.png" alt="Logo" />
        </div>
        <div className="navbar-Line">
          <hr />
        </div>
        {/* Sidebar buttons */}
        <button
          id="homeButton"
          className={activePage === "home" ? "active" : ""}
          onClick={() => handleNavigation("home")}
        >
          <img src="./src/assets/homebutton1.svg" alt="Home Icon" className="icon" />
          Home
        </button>
 
        <button
          id="popularButton"
          className={activePage === "group" ? "active" : ""}
          onClick={() => handleNavigation("group")}
        >
          <img src="./src/assets/popularbutton.svg" alt="Group Icon" className="Popular_icon" />
          Group
        </button>
 
        <button
          id="myPostsButton"
          className={activePage === "my-posts" ? "active" : ""}
          onClick={() => handleNavigation("my-posts")}
        >
          <img src="./src/assets/myPost.svg" alt="my post Icon" className="MyPost_icon" />
          My Posts
        </button>
 
        <button
          id="requestsButton"
          className={activePage === "communityServices" ? "active" : ""}
          onClick={() => handleNavigation("communityServices")}
        >
          <img src="./src/assets/request.svg" alt="request Icon" className="request_icon" />
          Community Services
        </button>
 
        <button
          id="chatButton"
          className={activePage === "chat" ? "active" : ""}
          onClick={() => handleNavigation("chat")}
        >
          <img src="./src/assets/chats.svg" alt="chats Icon" className="chat_icon" />
          Chat
        </button>
 
        <button
          id="createGroupButton"
          className={activePage === "createGroup" ? "active" : ""}
          onClick={() => handleNavigation("createGroup")}
 
        >
          <img src="./src/assets/group.svg" alt="group Icon" className="group_icon" />
          Create Group
        </button>
 
        <button
          id="settingsButton"
          className={activePage === "settings" ? "active" : ""}
          onClick={() => handleNavigation("settings")}
        >
          <img src="./src/assets/settings.svg" alt="setting Icon" className="settings_icon" />
          Settings
        </button>
 
        <div className="settingANDhelp-Line">
          <hr></hr>
        </div>
 
        <button
          id="helpButton"
          className={activePage === "help" ? "active" : ""}
          onClick={() => handleNavigation("help")}
        >
          <img src="./src/assets/help.svg" alt="help Icon" className="help_icon" />
          Help
        </button>
 
        <button
          id="aboutButton"
          className={activePage === "about" ? "active" : ""}
          onClick={() => handleNavigation("about")}
        >
          <img src="./src/assets/about.svg" alt="about Icon" className="about_icon" />
          About
        </button>
      </div>
    </>
  );
};
 
export default Navbar;
