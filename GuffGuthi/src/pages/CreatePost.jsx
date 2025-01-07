
import React from 'react';

import './CreatePost.css';
import HtmlEditor from '../components/TextEditor/HtmlEditor';

const CreatePost = () => {


  return (
    <>
      
     
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
          <button className='Post-Button'>Post</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;


          
