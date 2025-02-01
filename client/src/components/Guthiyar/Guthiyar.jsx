import React from "react";
import styles from "./Guthiyar.module.css";

function Guthiyar() {
  return (
    <>
      <div className={styles.container}></div>
      <div>
        <div className={styles.user}>
          <div className={styles.profileContainer}>
            <img
              className={styles.profileImg}
              src="./src/assets/profile.jpg"
              alt="user profile"
            />
          </div>
          <div className={styles.infoContainer}>
            <label id={styles.username} className={styles.userInfo}>
              happyday
            </label>
            <br />
            <label id={styles.occupation} className={styles.userInfo}>
              Journalist
            </label>
            <br />
            <label id={styles.location} className={styles.userInfo}>
              Kathmandu,Nepal
            </label>
          </div>
          <div className={styles.followBtn}>
            <button className={styles.follow}>follow</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Guthiyar;
