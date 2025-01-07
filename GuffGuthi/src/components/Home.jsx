import React from 'react';
// import "./post.css"
import Navbar from './navbar/Navbar';
import Chat from './chatINhome/Chat';
import Post from './postINhome/Post';
function Home(){
    return(
        <>
        <Navbar/>
        <Post/>
        <Chat/>
       
        </>
    )
}

export default Home;


