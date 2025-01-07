import React from "react";
import "./navbar.css";

const Navbar = ({ activePage, setActivePage }) => {
  return (
    <>
      <div className="search-container">

       <div className="search-bar">
          
          <button 
           id="searchButton"
           className={activePage === "search" ? "active" : ""}
           onClick={() => setActivePage("my-posts")}
         >
            <img src="./src/assets/search.svg" alt="search Icon" className="search_icon"/>
         </button>
         <input type="text" className="search-input" placeholder="Search..." />
       
         <button className="notification-button">
           <img src="./src/assets/notification.svg" alt="notification Icon" className="notification_icon"/>
           Notification
         </button>


         <button className="post-button">
           <img src="./src/assets/s_post.svg" alt="post Icon" className="Post_icon"/>
           Post
         </button>

       </div>

      </div>

      <div className="navbar">
        <div className="navbar-logo">
          <img src="./src/assets/logo.png" alt="Logo" />
        </div>

        <div className="navbar-Line">
        <hr></hr>
      </div>


        <button
          id="homeButton"
          className={activePage === "home" ? "active" : ""}
          onClick={() => setActivePage("home")}
        >
          <img src="./src/assets/homebutton1.svg" alt="Home Icon" className="icon" />
          Home
        </button>



        <button
          id="popularButton"
          className={activePage === "popular" ? "active" : ""}
          onClick={() => setActivePage("popular")}
        >
          <img src="./src/assets/popularbutton.svg" alt="Popular Icon" className="Popular_icon"/>
          Popular
        </button>




        <button
          id="myPostsButton"
          className={activePage === "my-posts" ? "active" : ""}
          onClick={() => setActivePage("my-posts")}
        >
           <img src="./src/assets/myPost.svg" alt="my post Icon" className="MyPost_icon"/>
          My Posts
        </button>




        <button
          id="requestsButton"
          className={activePage === "requests" ? "active" : ""}
          onClick={() => setActivePage("requests")}
        >
          <img src="./src/assets/request.svg" alt="request Icon" className="request_icon"/>
          Requests
        </button>




        <button
          id="chatButton"
          className={activePage === "chat" ? "active" : ""}
          onClick={() => setActivePage("chat")}
        >
           <img src="./src/assets/chats.svg" alt="chats Icon" className="chat_icon"/>

          Chat
        </button>




        <button
          id="createGroupButton"
          className={activePage === "createGroup" ? "active" : ""}
        >
          <img src="./src/assets/group.svg" alt="group Icon" className="group_icon" />
          Create Group
        </button>




        <button
          id="settingsButton"
          className={activePage === "settings" ? "active" : ""}
          onClick={() => setActivePage("settings")}
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
          onClick={() => setActivePage("help")}
        >
          <img src="./src/assets/help.svg" alt="help Icon" className="help_icon" />
          Help
        </button>




        <button
          id="aboutButton"
          className={activePage === "about" ? "active" : ""}
          onClick={() => setActivePage("about")}
        >
          <img src="./src/assets/about.svg" alt="about Icon" className="about_icon" />
          About
        </button>


      </div>
    </>
  );
};

export default Navbar;
