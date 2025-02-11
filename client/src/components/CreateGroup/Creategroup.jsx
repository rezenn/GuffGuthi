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

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  const fileInputRefLogo = useRef(null);
  const fileInputRefCover = useRef(null);

  const handleButtonClickLogo = () => {
    fileInputRefLogo.current.click(); // Trigger the hidden file input
  };

  const handleImageChangeLogo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoImageFile(file);
      setLogoImage(URL.createObjectURL(file)); // Temporary URL
    }
  };

  // Handle cover image upload
  const handleButtonClickCover = () => {
    fileInputRefCover.current.click(); // Trigger the hidden file input
  };

  const handleImageChangeCover = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
      setCoverImageFile(file); // Store the file object for upload
      setCoverImage(imageUrl); // Store the URL for display
    }
  };

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch("http://localhost:8000/group/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to get token");

        const groupData = await response.json();
        setLogoImage(groupData.groupLogo || "");
        setCoverImage(groupData.groupCover || "");
        setGroupName(groupData.groupName || "");
        setTopic(groupData.topic || "");
        setGroupDesc(groupData.groupDesc || "");
      } catch (error) {
        console.error(error.message);
        setError("Failed to fetch group data. Please try again.");
      } finally {
        setIsFetching(false);
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok)
        throw new Error(responseData.error || "Failed to create group");

      alert("Group created successfully!");
      navigate("/guthi");
    } catch (error) {
      console.error("Error:", error.message);
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
              <label className="groupname">Group Name:</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>

            {/* Group Logo */}
            <div className="group-logo-container">
              <label className="grouplogo">Logo:</label>
              <div className="input-button">
                <button
                  type="button"
                  className="changeLogo"
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
              </div>
            </div>

            {/* Group Cover */}
            <div className="group-cover-container">
              <label className="groupcover">Cover:</label>
              <div className="input-button">
                <button
                  type="button"
                  className="changeCover"
                  onClick={handleButtonClickCover}
                >
                  Choose cover
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefCover}
                  onChange={handleImageChangeCover}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Group Topic */}
            <div className="group-topic-container">
              <label className="topic">Topic:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            {/* Group Description */}
            <div className="group-description-container">
              <label className="groupdescription">Group Description:</label>
              <input
                type="text"
                value={groupDesc}
                onChange={(e) => setGroupDesc(e.target.value)}
                required
              />
            </div>

            {/* Create Group Button */}
            <button className="create-button">Create Group</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Creategroup;
