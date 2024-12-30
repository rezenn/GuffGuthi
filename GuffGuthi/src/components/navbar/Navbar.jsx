import React from "react";
import "./navbar.css";


const Navbar = ({ activePage, setActivePage }) => {
  return (
    <>
    

    <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <button className="search-button">🔍</button>
          </div>
          </div>

       


       

    <div className="navbar">
      <div className="navbar-logo">
        <img src="./src/assets/logo.png" alt="" />
      </div>
      <button
  id="homeButton"
  className={activePage === "home" ? "active" : ""}
  onClick={() => setActivePage("home")}
>
  <svg
    src="GuffGuthi/src/assets/send.svg"
    viewBox="0 0 24 24"
    width="20px"
    height="20px"
    fill="currentColor"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
  Home
</button>


      <button
        id="popularButton"
        className={activePage === "popular" ? "active" : ""}
        onClick={() => setActivePage("popular")}
      >
        Popular
      </button>


      <button
        id="myPostsButton"
        className={activePage === "my-posts" ? "active" : ""}
        onClick={() => setActivePage("my-posts")}
      >
        My Posts
      </button>


      <button
        id="requestsButton"
        className={activePage === "requests" ? "active" : ""}
        onClick={() => setActivePage("requests")}
      >
        Requests
      </button>


      <button
        id="chatButton"
        className={activePage === "chat" ? "active" : ""}
        onClick={() => setActivePage("chat")}
      >
        Chat
      </button>


      <button
        id="settingsButton"
        className={activePage === "settings" ? "active" : ""}
        onClick={() => setActivePage("settings")}
      >
        Settings
      </button>



      <button
        id="helpButton"
        className={activePage === "help" ? "active" : ""}
        onClick={() => setActivePage("help")}
      >
        Help
      </button>



      <button
        id="aboutButton"
        className={activePage === "about" ? "active" : ""}
        onClick={() => setActivePage("about")}
      >
        About
      </button>

    </div>
  


    
</>

  );
};

export default Navbar;
