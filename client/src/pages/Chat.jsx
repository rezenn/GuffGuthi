import React, { useState, useEffect, useRef } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import "./chat.css";
import InfoBar from "../components/InfoBar/InfoBar";
import Input from "../components/Input/Input";
import Messages from "../components/messages/messages";

let socket;
const ENDPOINT = "localhost:8000";

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const { name: queryName, room } = queryString.parse(window.location.search);
    const storedName = localStorage.getItem("userName"); // Retrieve from localStorage

    const formattedName = queryName
      ? queryName.trim().toLowerCase()
      : storedName;

    if (formattedName) {
      setName(formattedName);
      localStorage.setItem("userName", formattedName); // Save to localStorage
    }

    setRoom(room);
    socket = io(ENDPOINT);

    socket.emit("join", { name: formattedName, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <Navbar activePage="chat" setActivePage={() => {}} />

      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>

        {/* Users list */}
        <div>
          <h3>Users in Room:</h3>
          {users.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Chat;
