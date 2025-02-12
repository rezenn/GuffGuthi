import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { format } from "date-fns";
// Import date-fns for formatting
import "./request.css";

function Request() {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]); // Store fetched posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to format Date (YYYY/MM/DD)
  const formatDate = (isoString) => {
    if (!isoString) return "N/A"; // Handle missing dates
    return format(new Date(isoString), "yyyy/MM/dd");
  };

  // Function to format Time (h:mm a)
  const formatTime = (isoString) => {
    if (!isoString) return "N/A"; // Handle missing values
    const date = new Date(isoString);

    // Check if the time is actually set in the backend or defaults to 00:00:00
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    if (hours === 0 && minutes === 0) {
      return "Full Day Event"; // Handle cases where time isn't specified
    }

    return format(date, "h:mm a"); // Example: "9:00 AM"
  };

  // Function to truncate HTML content and extract plain text
  const truncateText = (html, maxLength) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    return plainText.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
  };

  // Fetch data from backend API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/community/requests"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Failed to load requests");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCreateClick = () => {
    navigate("/postRequest");
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-header">
          {!selectedPost ? (
            <>
              <div className="dashboard-title">Requests</div>
              <button className="create-button" onClick={handleCreateClick}>
                Create Request
              </button>
            </>
          ) : (
            <>
              <h2 className="postTitle">{selectedPost.title}</h2>
              <button className="back-button" onClick={handleBackClick}>
                Back to Requests
              </button>
            </>
          )}
        </div>

        <div className="dashboard-content">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : selectedPost ? (
            <div className="post-details">
              {/* <h2>{selectedPost.title}</h2> */}

              <div
                dangerouslySetInnerHTML={{ __html: selectedPost.description }}
              ></div>
              <p className="postDetail">
                <b>From:</b> {formatDate(selectedPost.start_date)}
              </p>
              <p className="postDetail">
                <b>To:</b> {formatDate(selectedPost.end_date)}
              </p>
              <p className="postDetail">
                <b>Time:</b> {formatTime(selectedPost.start_date)} -{" "}
                {formatTime(selectedPost.end_date)}
              </p>
              <p className="postDetail">
                <b>Location:</b> {selectedPost.location}
              </p>
            </div>
          ) : (
            <div className="post-list">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="post-preview"
                  onClick={() => handlePostClick(post)}
                >
                  <h3 className="postPreviewTitle">{post.title}</h3>
                  <p>{truncateText(post.description, 1550)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Request;
