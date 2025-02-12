import React, { useState } from "react";
import "./CreatePost.css";
import Navbar from "../components/navbar/Navbar";
import HtmlEditor from "../components/TextEditor/HtmlEditor";
import { useNavigate, useParams } from "react-router-dom";

const cleanHtml = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Remove unnecessary attributes or elements
  doc.querySelectorAll("[data-list]").forEach((el) => {
    el.removeAttribute("data-list");
  });

  doc.querySelectorAll(".ql-ui").forEach((el) => {
    el.remove();
  });

  return doc.body.innerHTML;
};

function GroupCreatePost() {
  const { groupId } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const [preview, setPreview] = useState(null); // For image preview
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Title and body are required.");
      return;
    }

    const cleanedBody = cleanHtml(body);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("body", cleanedBody);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `http://localhost:8000/groupFeed/${groupId}`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.token}`, // If authentication is required
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Post created successfully!");
        navigate(`/groupFeed/${groupId}`);
      } else {
        alert(`Error creating post: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
      alert("An error occurred while creating the post.");
    }
  };

  return (
    <>
      <Navbar activePage="guthi" setActivePage={() => {}} />
      <div className="CreatePost-Container">
        <h1>Create Post</h1>

        {/* Title Input */}
        <input
          type="text"
          className="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* File Input with Custom Styling */}
        <div className="file-input-container">
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="image"
            id="file-input"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file-input" className="custom-file-button">
            Add an Image
          </label>
        </div>

        {/* HTML Editor */}
        <HtmlEditor
          value={body}
          onChange={(content) => {
            setBody(content);
          }}
        />

        {/* Post Button */}
        <div className="ButtonPosition">
          <button className="Post-Button" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default GroupCreatePost;
