import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import styles from "./userProfile.module.css";
import { useParams } from "react-router-dom";
import ProfileUser from "../components/profileUser/profileUser";
import UserCoverImage from "../components/profileUser/userCoverImage";
import PostUser from "../components/profileUser/postUser";

function UserProfile() {
  const { userId } = useParams();

  return (
    <>
      <Navbar
        className="Navbar"
        activePage="guthiyar"
        setActivePage={() => {}}
      />
      <div className={styles.container}>
        <div className={styles.coverImg}>
          <UserCoverImage />
        </div>
        <div className={styles.profileAndPost}>
          <div className={styles.profile}>
            <ProfileUser />
          </div>
          <div className={styles.viewPost}>
            <PostUser />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
