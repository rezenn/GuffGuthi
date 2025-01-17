import React from "react";
import Navbar from "../navbar/Navbar";
import "./groups.css";

const group = () => {
  return (
    <>
      <Navbar />
      <div className="groups-container">
        <div className="groups-grid-container">
        <div className="groups-grid-container">
  <h2 className="groups-title">Groups</h2>
  <div className="groups-grid">
  </div>
</div>

          <div className="groups-grid">
            <button id="games-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              🎮  Games
            </button>
            <button id="news-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              📰  News
            </button>
            <button id="coding-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              💻  Coding
            </button>
            <button id="race-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              🏎️  Race
            </button>
            <button id="fishing-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              🎣  Fishing
            </button>
            <button id="book-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              📚  Book
            </button>
            <button id="animals-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              🐾  Animals
            </button>
            <button id="ice-cream-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              🍦  Ice Cream
            </button>
            <button id="journalist-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              ✏️  Journalist
            </button>
            <button id="dance-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              💃  Dance
            </button>
            <button id="food-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              🍔  Food
            </button>
            <button id="cars-button" className="group-button" style={{ backgroundColor: "rgb(170, 168, 168)" }}>
              <span className="group-emoji"></span>
              🚗  Cars
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default group;
