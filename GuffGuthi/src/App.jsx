import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./components/profileComponents/Profile";
import EditProfile from "./components/profileComponents/EditProfile";
import Navbar from "./components/navbar/Navbar";
import ViewProfilePage from "./pages/ViewProfilePage";
import ViewPost from "./components/profileComponents/ViewPost";
import CoverImage from "./components/profileComponents/CoverImage";
import EditProfilePage from "./pages/EditProfilePage";
import CreatePost from "./pages/CreatePost";
import Post from "./components/postINhome/Post";
import Chat from "./components/chatINhome/Chat";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <Router>
      {/* Render Navbar conditionally */}
      {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
        <Navbar activePage={activePage} setActivePage={setActivePage} />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/viewProfilePage" element={<ViewProfilePage />} />
        <Route path="/editProfilePage" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
