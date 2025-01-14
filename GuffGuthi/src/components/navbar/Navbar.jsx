const Navbar = ({ activePage, setActivePage }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigation = (page) => {
    setActivePage(page); // Update active page state
    navigate(`/${page}`); // Navigate to the route
    setIsSidebarOpen(false); // Close sidebar after navigation (optional)
  };

  return (
    <>
      {/* Search Container */}
      <div className="search-container">
        <button
          className="hamburger-menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <img
            src="./src/assets/hamburger.svg"
            alt="Menu"
            className="hamburger-icon"
          />
        </button>

        <div className="search-bar">
          <button
            id="searchButton"
            className={activePage === "search" ? "active" : ""}
            onClick={() => handleNavigation("search")}
          >
            <img
              src="./src/assets/search.svg"
              alt="Search Icon"
              className="search_icon"
            />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <button className="notification-button">
            <img
              src="./src/assets/notification.svg"
              alt="Notification Icon"
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
              alt="Post Icon"
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
              alt="Profile"
              className="profile"
            />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`navbar ${isSidebarOpen ? "open" : "closed"}`}>
        {/* Top Section */}
        <div className="navbar-top">
          <div className="navbar-logo">
            <img src="./src/assets/logo.png" alt="Logo" />
          </div>
          <hr />
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
            className={activePage === "group" ? "active" : ""}
            onClick={() => handleNavigation("group")}
          >
            <img
              src="./src/assets/popularbutton.svg"
              alt="Group Icon"
              className="Popular_icon"
            />
            Group
          </button>
          <button
            id="myPostsButton"
            className={activePage === "my-posts" ? "active" : ""}
            onClick={() => handleNavigation("my-posts")}
          >
            <img
              src="./src/assets/myPost.svg"
              alt="My Post Icon"
              className="MyPost_icon"
            />
            My Posts
          </button>
        </div>

        {/* Bottom Section */}
        <div className="navbar-bottom">
          <button id="settingsButton">
            <img
              src="./src/assets/settings.svg"
              alt="Settings Icon"
              className="settings_icon"
            />
            Settings
          </button>
          <button id="logoutButton">
            <img
              src="./src/assets/logout.svg"
              alt="Logout Icon"
              className="logout_icon"
            />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
