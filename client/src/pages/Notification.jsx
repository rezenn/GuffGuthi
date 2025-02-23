import React from "react";
import Navbar from "../components/navbar/Navbar";
import "./notification.css";
import Post from "../components/postINhome/Post";

const Notification = () => {
  return (
    <>
      <Navbar />
      <h1 className="title">Find something interesting to discuss </h1>
      <Post/>
      <div class="container">
        <p>Notification</p>
        <div class="close-btn">×</div>
        <div class="small-boxes">
            <div class="box"><p><span>@migma </span>liked your post</p></div>
            <div class="box">@jonh send you a message</div>
            <div class="box">@rohit_77 added a new post</div>
            <div class="box">@prachanda liked in your post</div>
        </div>
    </div>

    </>
  );
};

export default Notification;
