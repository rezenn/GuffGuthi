import React from 'react'
import "../AboutUs/aboutus.css";
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Aboutus = () => {
    const navigate = useNavigate();

  return (
    <>
    <Navbar activePage="about" setActivePage={() => {}} />
    <div className='aboutDesc'>
    <div className='about'>
        <h1>About Us</h1>

        <br/>
        
         <p style={{fontSize: "18px" , textIndent: "20px" , lineHeight: "1.4"}}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to GuffGuthi, a dynamic community-driven platform designed for open discussions, meaningful connections, and engaging 
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conversations. Whether you want to share your thoughts, create and join groups, chat with others, or explore various community services, 
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GuffGuthi provides a space where your voice matters.
        </p>
        <br/>

        <p style={{fontSize: "20px" , textIndent: "20px" , lineHeight: "1.4"}}><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b> GuffGuthi?</b></p>


        <br/>
        <br/>

        <p style={{fontSize: "18px" , textIndent: "20px" , lineHeight: "1.4"}}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. Express Freely – Share posts, engage in discussions, and create communities based on your interests.
        <br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;  2. Connect & Follow – Follow like-minded individuals and stay updated with their latest posts.
        <br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;  3. Groups & Communities – Join or create groups to discuss topics that interest you.
        <br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 4. Seamless Chat – Interact in real time with your community through built-in chat features.
        <br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; 5. Community Services – Contribute to and benefit from helpful services shared by fellow users.
       <br/><br/>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; At GuffGuthi, we believe in fostering a space where ideas can be exchanged, friendships can grow, and knowledge can be shared. Join us
       <br/> 
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; in building a vibrant online community!

        </p>
        <p>
         </p>
    </div>
    </div>
    </>
  )
};

export default Aboutus;