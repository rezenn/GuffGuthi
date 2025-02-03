import React from "react";
import styles from "./searchInput.module.css";

function SearchInput() {
  return (
    <form id={styles.form} className="flex items-center gap-2">
      <input type="text" placeholder="Search…" className={styles.search} />
      <button id={styles.searchBtn} type="submit">
        <img
          src="./src/assets/search.svg"
          alt="search"
          className={styles.serachBtnImg}
        />
      </button>
    </form>
  );
}

export default SearchInput;
