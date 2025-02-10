import React from "react";
import Navbar from "../components/navbar/Navbar";
import Guthiyar from "../components/Guthiyar/Guthiyar";
import styles from "./GuthiyarPage.module.css";

function GuthiyarPage() {
  return (
    <>
      <Navbar
        className="Navbar"
        activePage="guthiyar"
        setActivePage={() => {}}
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Guthiyars</h1>
        <Guthiyar className={styles.guthiyar} />
      </div>
    </>
  );
}

export default GuthiyarPage;
