import React from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";

import styles from "./chat.module.css";

function Chat() {
  return (
    <>
      <Navbar activePage="chat" setActivePage={() => {}} />
      <div className={styles.container}>
        <Sidebar className={styles.sidebar} />
        <MessageContainer className={styles.messageContainer} />
        <div></div>
      </div>
    </>
  );
}

export default Chat;
