import React, { useState } from "react";
import "./navbar.css"; // Include styles
import { useNavigate } from "react-router-dom";

const Navbar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  const handleNavigation = (page) => {
    setActivePage(page);
    navigate(`/${page}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          {/* Search Input and Search Button */}
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button">
            <img src="./src/assets/search.svg" alt="Search Icon" />
          </button>
        </div>
        {/* Icons Inside Search Bar */}
        <div className="search-icons">
          <button className="icon-button notification-button">
            <img src="./src/assets/notification.svg" alt="Notification Icon" />
          </button>
          <button
            className={`icon-button post-button ${activePage === "createPost" ? "active" : ""}`}
            onClick={() => handleNavigation("createPost")}
          >
            <img src="./src/assets/s_post.svg" alt="Post Icon" />
          </button>
          <button
            className={`icon-button profile-button ${activePage === "viewProfilePage" ? "active" : ""}`}
            onClick={() => handleNavigation("viewProfilePage")}
          >
            <img src="./src/assets/profile.jpg" alt="Profile" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          <img src="./src/assets/hamburger.svg" alt="Menu Icon" />
        </button>
        <div className="sidebar-content">
          <button
            className={`sidebar-item ${activePage === "home" ? "active" : ""}`}
            onClick={() => handleNavigation("home")}
          >
            <img src="./src/assets/homebutton1.svg" alt="Home Icon" />
            Home
          </button>
          <button
            className={`sidebar-item ${activePage === "group" ? "active" : ""}`}
            onClick={() => handleNavigation("group")}
          >
            <img src="./src/assets/popularbutton.svg" alt="Group Icon" />
            Group
          </button>
          <button
            className={`sidebar-item ${activePage === "my-posts" ? "active" : ""}`}
            onClick={() => handleNavigation("my-posts")}
          >
            <img src="./src/assets/myPost.svg" alt="My Posts Icon" />
            My Posts
          </button>
          {/* Add more sidebar items as needed */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
