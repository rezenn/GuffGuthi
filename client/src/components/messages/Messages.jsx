import React from "react";
import Message from "../Message/Message";
import ScrollToBottom from "react-scroll-to-bottom";

import "./messages.css";

function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
}

export default Messages;
