import React from "react";
import Navbar from "../components/navbar/Navbar";
import ViewPost from "../components/profileComponents/ViewPost";
import CoverImage from "../components/profileComponents/CoverImage";
import Profile from "../components/profileComponents/Profile";
import styles from "./GroupFeedPage.module.css"; // Ensure the correct CSS import path

function GroupFeedPage() {
  return (
    <>
      <Navbar activePage="groupFeed" setActivePage={() => {}} />
      <div className={styles.container}>
        <div className={styles.coverImg}>
          <CoverImage />
        </div>
        <div className={styles.profileAndPost}>
          <div className={styles.profile}>
            <Profile />
          </div>
          <div className={styles.viewPost}>
            <ViewPost />
          </div>
        </div>
      </div>
      <div>
        <p>gvhjevfhwbj</p>
      </div>
    </>
  );
}

export default GroupFeedPage;
