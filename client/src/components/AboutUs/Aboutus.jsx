import React from "react";
import "../AboutUs/aboutus.css";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Aboutus = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar activePage="about" setActivePage={() => {}} />
      <div className="aboutDesc">
        <div className="about">
          <h1 className="about-title">About Us</h1>

          <p className="about-text">
            Welcome to <b>GuffGuthi</b>, a dynamic community-driven platform
            designed for open discussions, meaningful connections, and engaging
            conversations. Whether you want to share your thoughts, create and
            join groups, chat with others, or explore various community
            services, GuffGuthi provides a space where your voice matters.
          </p>

          <h2 className="about-subtitle">Why GuffGuthi?</h2>

          <ul className="about-list">
            <li>
              <b>Express Freely</b> – Share posts, engage in discussions, and
              create communities based on your interests.
            </li>
            <li>
              <b>Connect & Follow</b> – Follow like-minded individuals and stay
              updated with their latest posts.
            </li>
            <li>
              <b>Groups & Communities</b> – Join or create groups to discuss
              topics that interest you.
            </li>
            <li>
              <b>Seamless Chat</b> – Interact in real-time with your community
              through built-in chat features.
            </li>
            <li>
              <b>Community Services</b> – Contribute to and benefit from helpful
              services shared by fellow users.
            </li>
          </ul>

          <h2 className="about-subtitle">Our Mission</h2>
          <p className="about-text">
            At GuffGuthi, we believe in fostering a space where ideas can be
            exchanged, friendships can grow, and knowledge can be shared. We aim
            to build a vibrant, inclusive online community that empowers users
            to engage freely and support each other.
          </p>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
