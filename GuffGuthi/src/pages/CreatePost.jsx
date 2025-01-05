import React from 'react';
import Navbar from '../components/navbar/Navbar';
import './CreatePost.css';
import HtmlEditor from '../components/TextEditor/HtmlEditor';

const CreatePost = () => {


  return (
    <>
      <Navbar />
      <HtmlEditor className="Editor"/>
     
      <div className='CreatePost-Container'>
        <h1>Create Post</h1>

        <input
          type='text'
          className='title'
          placeholder='Title'
        />


            
          {/* <textarea type="text"
            className='BodyText' 
            /> */}

        <div className='ButtonPosition'>
          <button className='Post-Button'>Post</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;


          
