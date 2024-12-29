import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ViewProfilePage from "./pages/ViewProfilePage";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/forgotPassword" element={<ForgotPassword />} />
    //   </Routes>
    // </Router>
    // <Profile/>
    // <EditProfile/>
    <ViewProfilePage/>
  );
}

export default App;
