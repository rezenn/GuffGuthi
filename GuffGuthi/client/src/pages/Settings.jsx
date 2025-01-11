import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import "./settings.css";
import logoutIcon from "../assets/logout.svg"; 

function Settings({ setAuth }) {
  // const [name, setName] = useState("");
  const navigate = useNavigate(); // Use the navigate function

  // Fetch the user name from the back-end
  // async function getName() {
  //   try {
  //     const response = await fetch("http://localhost:8000/home/", {
  //       method: "GET",
  //       headers: { token: localStorage.token }, // Assuming the token is stored in localStorage
  //     });
  //     const parseRes = await response.json();
  //     setName(parseRes.user_name);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // useEffect(() => {
  //   getName();
  // }, []);

  // Logout function
  const logout = (e) => {
    e.preventDefault();
    console.log("logout");
    localStorage.removeItem("token"); // Remove token from local storage
    setAuth(false); // Update authentication state
    navigate("/login"); // Navigate to the login page
  };

  return (
    <>
      <Navbar />
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
