import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Profile from "../components/profileComponents/Profile";
import ViewPost from "../components/profileComponents/ViewPost";
import CoverImage from "../components/profileComponents/CoverImage";
import styles from "./viewProfile.module.css";

function ViewProfile() {
    return (
        <>
      <Navbar className="Navbar" activePage="viewProfile" setActivePage={() => {}} /> 
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
        </>
    );
}

export default ViewProfile;
