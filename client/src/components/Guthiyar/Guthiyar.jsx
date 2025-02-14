import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Guthiyar.module.css";

function Guthiyar() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/user");
  //       const data = await response.json();
  //       if (response.ok) {
  //         setUsers(data);
  //       } else {
  //         console.error("Failed to fetch users:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/user");
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleNavigate = (userId) => {
    navigate(`/guthiyar/${userId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {users.length > 0 ? (
          users.map((user) => (
            <button
              key={user.user_id}
              className={styles.userBtn}
              onClick={() => handleNavigate(user.user_id)}
            >
              <div className={styles.profileContainer}>
                <img
                  className={styles.profileImg}
                  src={
                    user.profilepic
                      ? `http://localhost:8000${user.profilepic}`
                      : "./src/assets/profile.jpg"
                  }
                  alt="User Profile"
                />
              </div>
              <div className={styles.infoContainer}>
                <p id={styles.username} className={styles.userInfo}>
                  {user.user_name}
                </p>
                <p id={styles.occupation} className={styles.userInfo}>
                  {user.occupation || "No Occupation"}
                </p>
                <p id={styles.location} className={styles.userInfo}>
                  {user.location || "No Location"}
                </p>
              </div>
              <div className={styles.followBtn}></div>
              {/* <Link to="/guthi" className={styles.follow}>
                Follow
              </Link> */}
            </button>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default Guthiyar;
