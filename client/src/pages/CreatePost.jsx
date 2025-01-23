import React, { useState } from "react";
import "./CreatePost.css";
import Navbar from "../components/navbar/Navbar";
import HtmlEditor from "../components/TextEditor/HtmlEditor"; // Assuming this is a rich-text editor
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState(""); // For rich-text editor content
  const navigate = useNavigate();

  const handlePost = async () => {
    if (!title.trim() || !body.trim()) {
      alert("Title and body are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("body", body.trim());
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
          token: localStorage.token,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Post created successfully!");
        navigate("/home"); // Redirect to home page
      } else {
        const errorData = await response.json();
        alert(`Error creating post: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <>
      <Navbar activePage="createPost" setActivePage={() => {}} />
      <div className="CreatePost-Container">
        <h1>Create Post</h1>

        <input
          type="text"
          className="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <HtmlEditor
          className="Editor"
          onChange={(content) => setBody(content)}
        />

        <div className="ButtonPosition">
          <button className="Post-Button" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
