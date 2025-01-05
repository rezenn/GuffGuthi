import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword"
import Profile from "./components/profileComponents/Profile";
import EditProfile from "./components/profileComponents/EditProfile";
import Navbar from "./components/navbar/Navbar";
import ViewProfilePage from "./pages/ViewProfilePage";
import home from "./pages/home";
import ViewPost from "./components/profileComponents/ViewPost";
import CoverImage from "./components/profileComponents/CoverImage";
import EditProfilePage from "./pages/EditProfilePage";
import CreatePost from "./pages/CreatePost";
import HtmlEditor from "./components/TextEditor/HtmlEditor";
import PostRequest from "./pages/PostRequest";


function App() {
  const [activePage, setActivePage] = useState("Navbar");

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <div>Welcome to the Home Page</div>;
      case "popular":
        return <div>Popular Posts Section</div>;
      case "my-posts":
        return <div>My Posts Section</div>;
      case "requests":
        return <div>Requests Section</div>;
      case "chat":
        return <div>Chat Section</div>;
      default:
        return <div>Welcome to the Home Page</div>;
    }
  };

//   return (
//     <Router>
//       <Routes>
//         {/* Authentication Routes */}
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgotPassword" element={<ForgotPassword />} />

//         {/* Protected Routes */}
//         <Route
//           path="/*"
//           element={
//             <div style={{ display: "flex" }}>
//               {/* Vertical Navbar */}
//               <Home activePage={activePage} setActivePage={setActivePage} />

//               {/* Main Content Area */}
//               <div style={{ marginLeft: "200px", padding: "20px", flexGrow: 1 }}>
//                 {renderContent()}
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// return(<CreatePost/>) 

return(<CreatePost/>) 
// return(<HtmlEditor/>)
}

export default App;