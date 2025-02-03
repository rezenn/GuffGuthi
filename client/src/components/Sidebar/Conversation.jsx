import React from "react";
import styles from "./Conversation.module.css";

function Conversation() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.avtarImg}>
          <img id={styles.avtar} src="./src/assets/profile.jpg" alt="profile" />
        </div>
        <div>
          <p className={styles.name}>Henry</p>
        </div>
      </div>
    </>
  );
}

export default Conversation;
