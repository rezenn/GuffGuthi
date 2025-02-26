import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./join.css";
import Navbar from "../components/navbar/Navbar";
function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <>
      <Navbar activePage="join" setActivePage={() => {}} />

      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Join a Room</h1>
          <div>
            <input
              type="text"
              placeholder="Enter a username"
              className="joinInput"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter a room name"
              className="joinInput mt-20"
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>
          <Link
            onClick={(event) =>
              !name || !room ? event.preventDefault() : null
            }
            to={`/chat?name=${encodeURIComponent(
              name
            )}&room=${encodeURIComponent(room)}`}
          >
            <button className="button mt-20" type="submit">
              Enter the room
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Join;
