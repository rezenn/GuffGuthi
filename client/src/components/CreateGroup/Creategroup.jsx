import React from 'react'
import '../CreateGroup/creategroup.css';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Creategroup = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
      navigate('/createGroup'); 
  };

  return (
    <>
    {/* <Navbar/> */}
    <Navbar activePage="createGroup" setActivePage={() => {}} />
    <div className='createGroup-Container'>
    <div className='create_group'>
        <form action="">
          <h1>Create Group</h1>

          <div className="group-name">
            <label className="groupname">Group Name</label> <br />
            <input type="text" placeholder="Enter group name" required />   
          </div>

          

          <div className="group-logo">
            <label className="grouplogo">Logo</label> <br />
            <input type="text" placeholder="Enter group logo" required />   
          </div>

          <button className='logo-button'>
            Add logo
          </button>


          <div className="group-cover">
            <label className="groupcover">Cover</label> <br />
            <input type="text" placeholder="Enter group cover" required />   
          </div>

          <button className='cover-button'>
            Add cover
          </button>

          
          <div className="topic">
            <label className="topic">Cover</label> <br />
            <input type="text" placeholder="Enter group topic" required />   
          </div>


          <div className="group-description">
            <label className="groupdescription">Cover</label> <br />
            <input type="text" placeholder="Enter group description" required />   
          </div>


          <button className='create-button'>
            Create Group
          </button>


        </form>
    </div>
    </div>
    </>
  )

};

export default Creategroup;