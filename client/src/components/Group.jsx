import React from "react";
import Navbar from "./navbar/Navbar";
import "./groups.css";
import { Link, useNavigate } from "react-router-dom";

const Group = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/groupFeed");
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
            <button className="group-button" onClick={handleNavigate}>
              Journalist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;
