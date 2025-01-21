import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ViewProfile from "./pages/ViewProfilePage";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfilePage";
import CreatePost from "./pages/CreatePost";
import PostRequest from "./pages/PostRequest/PostRequest";
import CommunityServices from "./pages/CommunityServicesPage";
import Settings from "./pages/Settings";
import Group from "./components/Group";
import GroupFeedPage from "./pages/GroupFeedPage";
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const [activePage, setActivePage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:8000/auth/verifyed", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();

      if (parseRes === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");  // Remove invalid token
      }
    } catch (err) {
      console.error(err.message);
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* You can uncomment this line for the Navbar if needed */}
        {/* {isAuthenticated && <Navbar activePage={activePage} setActivePage={setActivePage} setAuth={setAuth} />} */}

        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/login" element={ 
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/home" />
            )} />

          <Route path="/register" element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/home" />
            )} />

          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route path="/home" element={
            isAuthenticated ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />

          <Route path="/group" element={
            isAuthenticated ? (
              <Group setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />
          <Route path="/groupFeed" element={
            isAuthenticated ? (
              <GroupFeedPage setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />

          <Route path="/createPost" element={
            isAuthenticated ? (
              <CreatePost setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />

          <Route path="/viewProfile" element={
            isAuthenticated ? (
              <ViewProfile setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />

          <Route path="/editProfile" element={
            isAuthenticated ? (
              <EditProfile setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />

          <Route path="/communityServices" element={
            isAuthenticated ? (
              <CommunityServices setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />

          <Route path="/postRequest" element={
            isAuthenticated ? (
              <PostRequest setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />

          <Route path="/settings" element={
            isAuthenticated ? (
              <Settings setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
