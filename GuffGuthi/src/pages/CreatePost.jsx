
import React from 'react';

import './CreatePost.css';
import Navbar from '../components/navbar/Navbar';
import HtmlEditor from '../components/TextEditor/HtmlEditor';
import { useNavigate } from 'react-router-dom';


function CreatePost(){
  const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/PostRequest'); 
    };

  return (
    <>
        <Navbar activePage="createPost" setActivePage={() => {}} />
        <div className='CreatePost-Container'>
        <h1>Create Post</h1>

        <input
          type='text'
          className='title'
          placeholder='Title'
        />

<HtmlEditor className="Editor"/>
            
          {/* <textarea type="text"
            className='BodyText' 
            /> */}

        <div className='ButtonPosition'>
          <button onClick={handleNavigate} className='Post-Button'>Post</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;


          
