import React from "react";

import "./input.css";

function Input({ message, setMessage, sendMessage }) {
  return (
    <>
      <form className="form">
        <input
          type="text"
          className="input"
          placeholder="Type your message ..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button className="sendButton" onClick={(e) => sendMessage(e)}>
          <div className="iconContainer">
          <img
            className="sendIcon"
            src="./src/assets/paper-plane.png"
            alt="send"
          />
          </div>
        </button>
      </form>
    </>
  );
}

export default Input;
