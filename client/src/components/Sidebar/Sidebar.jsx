import React from "react";
import SearchInput from "./SearchInput";
import styles from "./sidebar.module.css";
import Conversations from "./Conversations";
function Sidebar() {
  return (
    <>
      <div className={styles.container}>
        <SearchInput />
        <hr className={styles.hr} />
        <Conversations />
      </div>
    </>
  );
}

export default Sidebar;
