import React from "react";

import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img
        className="onlineIcon"
        src="./src/assets/onlineIcon.png"
        alt="online icon"
      />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/join">
        <img
          className="img"
          src="./src/assets/closeIcon.png"
          alt="close icon"
        />
      </a>
    </div>
  </div>
);

export default InfoBar;
