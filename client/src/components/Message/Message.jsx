import React from "react";
import "./Message.css";
function Message({ message: { text, user }, name }) {
  let isSentByCurrentUser = false;

  const trimmedName = name?.trim().toLowerCase(); // Ensure lowercase comparison

  if (user?.trim().toLowerCase() === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      {" "}
      {/* Right side for sender */}
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      {" "}
      {/* Left side for receiver */}
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{text}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
}

export default Message;
