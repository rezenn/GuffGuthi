import React, { useState } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activePage, setActivePage }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isSidebarVisible ? 'Hide' : 'Show'} Menu
        </button>
        <div className="navbar">
          <div className="navbar-logo">
            <img src="./src/assets/logo.png" alt="Logo" />
          </div>
          <div className="navbar-Line">
            <hr />
          </div>
          {/* Sidebar buttons */}
          {/* ... (rest of your sidebar buttons) */}
        </div>
      </div>

      <div className="search-container">
        <div className="search-bar">
          <button
            id="searchButton"
            className={activePage === "search" ? "active" : ""}
            onClick={() => handleNavigation("search")}
          >
            <img src="./src/assets/search.svg" alt="search Icon" className="search_icon" />
          </button>
          <input type="text" className="search-input" placeholder="Search..." />
          <div className="search-actions">
            <button className="notification-button">
              <img src="./src/assets/notification.svg" alt="notification Icon" className="notification_icon" />
            </button>
            <button
              id="post-button"
              className={activePage === "createPost" ? "active" : ""}
              onClick={() => handleNavigation("createPost")}
            >
              <img src="./src/assets/s_post.svg" alt="post Icon" className="Post_icon" />
            </button>
            <button
              id="profile"
              className={activePage === "viewProfilePage" ? "active" : ""}
              onClick={() => handleNavigation("viewProfilePage")}
            >
              <img src="./src/assets/profile.jpg" alt="profile" className="profile" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;