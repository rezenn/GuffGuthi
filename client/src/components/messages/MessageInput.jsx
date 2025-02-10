import React from "react";
import styles from "./messageInput.module.css"; // Import the CSS file

function MessageInput() {
  return (
    <form className={styles.message_form}>
      <div className={styles.input_container}>
        <input
          type="text"
          className={styles.message_input}
          placeholder="Send a message"
        />
        <button type="submit" className={styles.send_button}>
          <img src="./src/assets/send.png" alt="send" />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
