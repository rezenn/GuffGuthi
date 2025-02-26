import React, { useEffect, useState } from "react";
import styles from "./GroupFeedPage.module.css";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import GroupPost from "../components/groupPost/groupPost";

function GroupFeedPage() {
  const navigate = useNavigate();
  const { groupId } = useParams(); // Capture the groupId from the URL
  const [groupData, setGroupData] = useState(null); // State to store group data
  const [isFetching, setIsFetching] = useState(true); // Loading state

  const createPost = (e) => {
    e.preventDefault();
    navigate(`/groupCreatePost/${groupId}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No logged-in user found.");
      setIsFetching(false);
      return;
    }
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/group/${groupId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add your token here
          },
        });
        const data = await response.json();
        if (response.ok) {
          setGroupData(data);
        } else {
          console.error("Error fetching group data:", data.error);
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  // If groupData is null, display loading
  if (!groupData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar className="Navbar" activePage="guthi" setActivePage={() => {}} />
      <div className={styles.container}>
        <div className={styles.coverImg}>
          <img
            className={styles.grouplogo}
            src={`http://localhost:8000/${groupData.group_cover}`}
            alt="GroupProfile"
          />
        </div>

        <div>
          <div className={styles.GroupProfile}>
            <div className={styles.GroupProfileImg}>
              <button onClick={createPost} className={styles.createPostBtn}>
                Create Post
              </button>

              <img
                src={`http://localhost:8000/${groupData.group_logo}`}
                alt="GroupProfile"
              />
            </div>
            <h2 className={styles.groupTitle}>{groupData.group_name}</h2>
            <hr className={styles.hr} />
          </div>
        </div>
        <section className={styles.GroupDesc}>
          <ul className={styles.GroupDescUl}>
            <li className={styles.GroupDescLi}>
              <span>
                <strong>Group Topic: </strong>
              </span>
              <span>{groupData.topic}</span>
            </li>
            <li className={styles.GroupDescLi}>
              <span>
                <strong>Group Description: </strong>
              </span>
              <span>{groupData.group_desc}</span>
            </li>

            <li className={styles.GroupDescLi}>
              <span>
                <strong>Rules: </strong>
              </span>
              <span>
                Refrain from being rude to others even if you do not agree with
                their sentiments. Refrain from posting false and confidential
                information. Respect all of the users and members.
              </span>
            </li>
          </ul>
        </section>

        <div className={styles.viewPost}>
          <GroupPost />
        </div>
      </div>
    </>
  );
}

export default GroupFeedPage;
