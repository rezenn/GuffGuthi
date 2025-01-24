import React, { useState } from "react";
import "./CreatePost.css";
import Navbar from "../components/navbar/Navbar";
import HtmlEditor from "../components/TextEditor/HtmlEditor";
import { useNavigate } from "react-router-dom";

const cleanHtml = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("[data-list]").forEach((el) => {
    el.removeAttribute("data-list");
  });

  doc.querySelectorAll(".ql-ui").forEach((el) => {
    el.remove();
  });

  return doc.body.innerHTML;
};

function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handlePost = async () => {
    const cleanedBody = cleanHtml(body);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("body", cleanedBody);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:8000/post", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Post created successfully!");
        navigate("/home");
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
          value={body}
          onChange={(content) => {
            setBody(content);
          }}
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
