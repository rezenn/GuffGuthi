import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import Navbar from "../components/navbar/Navbar";
import "./PostRequest.css";
import DesEditor from "../components/TextEditor/DesEditor"; // Make sure DesEditor component works as expected

function PostRequest() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("postRequest");

  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle description editor changes
  const handleDescriptionChange = (newDescription) => {
    setFormData((prevState) => ({ ...prevState, description: newDescription }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:8000/api/community/requests",
        formData
      );
      navigate("/communityServices"); // Redirect after successful submission
    } catch (error) {
      console.error("Error creating request:", error);
      setError("Failed to create request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar activePage="communityServices" />
      <main>
        <div className="PostReq-Container">
          <h1 className="Heading">Post for Community Service</h1>
          {error && <p className="error">{error}</p>}
          <form className="postRequestForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="formTitle1">Title:</label>
              <input
                className="inputTitle1"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="formTitle1">From:</label>
              <input
                className="inputTitle1"
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="formTitle1">To:</label>
              <input
                className="inputTitle1"
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="formTitle1">Location:</label>
              <input
                className="inputTitle1"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-editor">
              <label className="formTitle-Des">Description:</label>
              <DesEditor
                value={formData.description}
                onChange={handleDescriptionChange}
              />
            </div>
            <button
              type="submit"
              className="post-request-btn"
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Request"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default PostRequest;
