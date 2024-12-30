import React from "react";
import "./home.css";

const Home = ({ activePage, setActivePage }) => {
  return (
    <>
    
        <div className="home-container">

        

        <div className="chat-container">
            <div className="chat-header">Chats</div>
        </div>

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


          <div className="post-container">
    <div className="post">Your Post Content Here</div>
  </div>

    <div className="navbar">
      <div className="navbar-logo">
      </div>

      <button
        id="homeButton"
        className={activePage === "home" ? "active" : ""}
        onClick={() => setActivePage("home")}
      >
        Home
      </button>
      {/* </button> */}


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
  


        </div>
    
</>

  );
};

export default Home;
