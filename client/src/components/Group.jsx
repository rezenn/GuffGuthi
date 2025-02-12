import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./groups.css";

const Group = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch groups when the component mounts
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:8000/group");
        const data = await response.json();
        if (response.ok) {
          setGroups(data); // Update state with the fetched groups
        } else {
          console.error("Failed to fetch groups:", data.error);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleNavigate = (groupId) => {
    // Navigate to the group feed for the selected group
    navigate(`/guthi/${groupId}`);
  };

  return (
    <>
      <Navbar className="Navbar" activePage="guthi" setActivePage={() => {}} />
      <div className="groups-container">
        <div className="groups-grid-container">
          <div className="groups-grid-container">
            <h2 className="groups-title">Groups</h2>
          </div>
          <div className="groups-grid">
            {groups.length > 0 ? (
              groups.map((group) => (
                <button
                  key={group.group_id}
                  className="group-button"
                  onClick={() => handleNavigate(group.group_id)}
                >
                  <div className="groupInfo">
                    <img
                      className="groupLogo"
                      src={`http://localhost:8000/${group.group_logo}`}
                      alt="Group Logo"
                    />
                    <p className="groupName"> {group.group_name}</p>
                  </div>
                </button>
              ))
            ) : (
              <p>No groups found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
