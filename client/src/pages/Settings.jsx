import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./settings.css";
import logoutIcon from "../assets/logout.svg";

function Settings({ setAuth }) {
  const navigate = useNavigate(); // Use the navigate function

  // Logout function
  const logout = (e) => {
    e.preventDefault();
    console.log("logout");

    // Clear all local storage data
    localStorage.clear();

    // Update authentication state
    setAuth(false);

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <>
      <Navbar className="Navbar" activePage="home" setActivePage={() => {}} />
      <div className="container">
        <button onClick={logout} className="logout-button">
          <img src={logoutIcon} alt="Logout Icon" className="logout_icon" />
          Logout
        </button>
      </div>
    </>
  );
}

export default Settings;
