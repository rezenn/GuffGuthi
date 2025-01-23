import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token"); // Check if token exists on initialization
  });

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
    if (!boolean) localStorage.removeItem("token"); // Clear token on logout
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/verifyed", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      if (!response.ok) {
        throw new Error("Token validation failed");
      }

      const parseRes = await response.json();

      if (parseRes === true) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Authentication Error: ", error.message);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      isAuth();
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Login setAuth={setAuth} />} />

          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            path="/forgotPassword"
            element={
              !isAuthenticated ? (
                <ForgotPassword setAuth={setAuth} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <Home setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/group"
            element={
              isAuthenticated ? (
                <Group setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/groupFeed"
            element={
              isAuthenticated ? (
                <GroupFeedPage setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/createPost"
            element={
              isAuthenticated ? (
                <CreatePost setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/viewProfile"
            element={
              isAuthenticated ? (
                <ViewProfile setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/editProfile"
            element={
              isAuthenticated ? (
                <EditProfile setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/communityServices"
            element={
              isAuthenticated ? (
                <CommunityServices setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/postRequest"
            element={
              isAuthenticated ? (
                <PostRequest setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <Settings setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
