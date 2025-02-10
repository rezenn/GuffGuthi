import React from "react";
import styles from "./messageContainer.module.css";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";

function MessageContainer() {
  const { selectedConversation } = useConversation();

  return (
    <div className={styles.message_container}>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className={styles.message_header}>
            <img
              className={styles.userProfile}
              src="./src/assets/profile.jpg"
              alt="avatar"
            />
            <span className={styles.recipient_name}>Henry</span>
          </div>

          {/* Messages and Input */}
          <div className={styles.msgsContainer}>
            <Messages />
          </div>
          <MessageInput styles={styles.message_input} />
        </>
      )}
    </div>
  );
}

export default MessageContainer;

function NoChatSelected() {
  return (
    <div>
      <p>No chat selected.</p>
    </div>
  );
}
