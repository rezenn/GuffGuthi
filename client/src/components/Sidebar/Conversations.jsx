import React from "react";
import Conversation from "./Conversation";

import styles from "./conversations.module.css";

function Conversations() {
  return (
    <>
      <div className={styles.container}>
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
    </>
  );
}

export default Conversations;
