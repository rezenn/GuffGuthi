import React from "react";
import "./message.css"; // Import the CSS file

function Message() {
  return (
    <div className={`chat`}>
      <div className="profileMessage">
        <div className="chat_image avatar">
          <div className="avatar_image">
            <img src="./src/assets/profile.jpg" alt="User avatar" />
          </div>
        </div>
        <div className={`chat_bubble `}>
          test testing test testing test testing test testing test testing test
          testing test testing test testing test testing test testing test
          testing test testing.
        </div>
      </div>
      <div className="chat_footer">6:34 </div>
    </div>
  );
}

export default Message;
