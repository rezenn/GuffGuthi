import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from 'react-query'


import Navbar from "../components/navbar/Navbar";
import Chat from "../components/chatINhome/Chat";
<<<<<<< HEAD
import Post from "../components/postINhome/Post";
=======
import Posts from "../components/postINhome/posts";
import post from "../components/postINhome/Post";
>>>>>>> 12a5369bf50b0c5dfdf8b249ae26712685b90ba6
import "./homePage.css";

function Home({setAuth}){
const [name, setName] = useState("");
  
    async function getName(){
      try {
  
        const response = await fetch(
          "http://localhost:8000/home/",
          {
            method: "GET",
            headers: {token: localStorage.token},
          }
        );
        const parseRes = await response.json();
  
  
  setName(parseRes.user_name);    
      } catch (err) {
        console.error(err.message);
        
      }
    }
    useEffect(() => {
      getName();
    }, []);


    const { isLoading, error, data } = useQuery('repoData', () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
        res.json()
      )
    )

  return(
    <>
      <Navbar className="Navbar" activePage="home" setActivePage={() => {}} /> 
      <h1 className="title">Find something interesting to discuss  </h1>
<<<<<<< HEAD
  <Post/>
  <Post/>
  <Post/>
  <Post/>
  <Post/>
  <Post/>
  <Post/>
  <Chat/>
=======
  <Posts/>
  
  {/* <Chat/> */}
>>>>>>> 12a5369bf50b0c5dfdf8b249ae26712685b90ba6
  
    </>
)
}

export default Home;