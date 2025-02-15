import React, { useEffect, useRef, useState } from "react";
import "../CreateGroup/creategroup.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Creategroup = () => {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [topic, setTopic] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [logoImageFile, setLogoImageFile] = useState(null);
  const [logoImage, setLogoImage] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImage, setCoverImage] = useState("");
  const [logoClass, setLogoClass] = useState("default-logo");
  const [coverClass, setCoverClass] = useState("default-cover");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRefLogo = useRef(null);
  const fileInputRefCover = useRef(null);

  // Handle Logo Image Upload
  const handleButtonClickLogo = () => {
    fileInputRefLogo.current.click();
  };

  const handleImageChangeLogo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoImageFile(file);
      setLogoImage(URL.createObjectURL(file));
      setLogoClass("uploaded-logo");
    }
  };

  // Handle Cover Image Upload
  const handleButtonClickCover = () => {
    fileInputRefCover.current.click();
  };

  const handleImageChangeCover = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImage(URL.createObjectURL(file));
      setCoverClass("uploaded-cover");
    }
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch("http://localhost:8000/group/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (!response.ok) throw new Error("Failed to fetch group data.");

        const groupData = await response.json();
        setLogoImage(groupData.groupLogo || "");
        setCoverImage(groupData.groupCover || "");
        setGroupName(groupData.groupName || "");
        setTopic(groupData.topic || "");
        setGroupDesc(groupData.groupDesc || "");
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGroup();
  }, []);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("group_name", groupName);
    formData.append("topic", topic);
    formData.append("group_desc", groupDesc);
    if (logoImageFile) formData.append("group_logo", logoImageFile);
    if (coverImageFile) formData.append("group_cover", coverImageFile);

    try {
      const response = await fetch("http://localhost:8000/group", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create group");

      alert("Group created successfully!");
      navigate("/guthi");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar activePage="createGroup" setActivePage={() => {}} />
      <div className="createGroup-Container">
        <div className="create_group">
          <form onSubmit={handleCreateGroup}>
            <h1>Create Group</h1>

            {/* Group Name */}
            <div className="group-name-container">
              <label>Group Name:</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>

            {/* Group Logo */}
            <div className="group-logo-container">
              <label>Logo:</label>
              <div className="input-button">
                <button
                  className="createBtn"
                  type="button"
                  onClick={handleButtonClickLogo}
                >
                  Choose Logo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefLogo}
                  onChange={handleImageChangeLogo}
                  style={{ display: "none" }}
                />
                {logoImage && (
                  <img src={logoImage} alt="Group Logo" className={logoClass} />
                )}
              </div>
            </div>

            {/* Group Cover */}
            <div className="group-cover-container">
              <label>Cover:</label>
              <div className="input-button">
                <button
                  className="createBtn"
                  type="button"
                  onClick={handleButtonClickCover}
                >
                  Choose Cover
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefCover}
                  onChange={handleImageChangeCover}
                  style={{ display: "none" }}
                />
                {coverImage && (
                  <img
                    src={coverImage}
                    alt="Group Cover"
                    className={coverClass}
                  />
                )}
              </div>
            </div>

            {/* Group Topic */}
            <div className="group-topic-container">
              <label>Topic:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            {/* Group Description */}
            <div className="group-description-container">
              <label>Description:</label>
              <textarea
                value={groupDesc}
                onChange={(e) => setGroupDesc(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Create Group Button */}
            <button className="createBtn" type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Group"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Creategroup;
