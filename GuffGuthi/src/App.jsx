import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./components/profileComponents/Profile";
import EditProfile from "./components/profileComponents/EditProfile";
import Navbar from "./components/navbar/Navbar";
import ViewProfilePage from "./pages/ViewProfilePage";
import ViewPost from "./components/profileComponents/ViewPost";
import CoverImage from "./components/profileComponents/CoverImage";
import EditProfilePage from "./pages/EditProfilePage";
import CreatePost from "./pages/CreatePost";
// import post from "./components/postINhome/Post";
import Home from "./components/home";
import Post from "./components/postINhome/Post";
import Chat from "./components/chatINhome/Chat";

//

function App() {
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/forgotPassword" element={<ForgotPassword />} />
  //     </Routes>
  //   </Router> 
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<ViewProfilePage />} /> 
    //     <Route path="/viewProfilePage" element={<ViewProfilePage />} /> 
    //     <Route path="/editProfilePage" element={<EditProfilePage />} /> 
    //   </Routes>
    // </Router> 
  // );
  const [activePage, setActivePage] = useState("Navbar");

  // const renderContent = () => {
  //   switch (activePage) {
  //     case "home":
  //       return <div>Welcome to the Home Page</div>;
  //     case "popular":
  //       return <div>Popular Posts Section</div>;
  //     case "my-posts":
  //       return <div>My Posts Section</div>;
  //     case "requests":
  //       return <div>Requests Section</div>;
  //     case "chat":
  //       return <div>Chat Section</div>;
  //     default:
  //       return <div>Welcome to the Home Page</div>;
  //   }
  // };

// return(<>
// {/* <EditProfilePage/> */}
// {/* <ViewProfilePage/> */}
// </>  
// ) 

return(<Home/>)
}

export default App;