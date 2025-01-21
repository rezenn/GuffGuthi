import React from "react";
import Navbar from "../components/navbar/Navbar";
import ViewPost from "../components/profileComponents/ViewPost";
import Post from "../components/postINhome/Post";
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

        <div className={styles.GroupProfile}>
          <button className={styles.createPostBtn}>Create Post</button>
          <img src="./src/assets/groupProfile.jpg" alt="GroupProfile" />
          <h2 className={styles.groupTitle}>Journalist</h2>
        </div>

        <div className={styles.GroupBio}>
          <p><strong>Created on:</strong> 2023/12/20</p><br />
          <p><strong>Posts:</strong> 193</p><br />
          <h3>Rules</h3><br />
          <ul>
            <li>Be respectful and courteous to others, even when you disagree with their views.</li>
            <li>Avoid sharing false or confidential information.</li>
            <li>Show respect for all users and members.</li>
          </ul>
        </div>

        <div className={styles.viewPost}>
          <Post />
          <Post />
          <Post />
          <Post />
          
        </div>
      </div>
    </>
  );
}

export default GroupFeedPage;
