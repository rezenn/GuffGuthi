import React from "react";
import Navbar from "../components/navbar/Navbar";
import MyPostComponent from "../components/myPost/MyPostComponent";

function MyPost() {
  return (
    <>
      <Navbar
        className="Navbar"
        activePage="myPosts"
        setActivePage={() => {}}
      />

      <MyPostComponent />
    </>
  );
}

export default MyPost;
