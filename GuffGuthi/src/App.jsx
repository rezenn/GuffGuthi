import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./components/profileComponents/Profile";
import EditProfile from "./components/profileComponents/EditProfile";
import ViewProfilePage from "./pages/ViewProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} /> */}
        <Route path="/" element={<ViewProfilePage />} />
        <Route path="/EditProfile" element={<EditProfile />} />
      </Routes>
    </Router>

    
    
  );
}

export default App;
