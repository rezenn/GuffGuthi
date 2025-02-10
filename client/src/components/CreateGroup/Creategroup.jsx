// import React from 'react'
// import '../CreateGroup/creategroup.css';
// import Navbar from '../navbar/Navbar';
// import { useNavigate } from 'react-router-dom';

// const Creategroup = () => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//       navigate('/createGroup'); 
//   };

//   return (
//     <>
//     {/* <Navbar/> */}
//     <Navbar activePage="createGroup" setActivePage={() => {}} />
//     <div className='createGroup-Container'>
//     <div className='create_group'>
//         <form action="">
//           <h1>Create Group</h1>

//           <div className="group-name">
//             <label className="groupname">Group Name:</label> 
//             <input type="text" placeholder="Enter group name" required />   
//           </div>

          

//           <div className="group-logo">
//             <label className="grouplogo">Logo:</label>
//             <input type="text" placeholder="Enter group logo" required />   
//           </div>

//           <button className='logo-button'>
//             Add logo
//           </button>


//           <div className="group-cover">
//             <label className="groupcover">Cover:</label> 
//             <input type="text" placeholder="Enter group cover" required />   
//           </div>

//           <button className='cover-button'>
//             Add cover
//           </button>

          
//           <div className="topic">
//             <label className="topic">Topic:</label> 
//             <input type="text" placeholder="Enter group topic" required />   
//           </div>


//           <div className="group-description">
//             <label className="groupdescription">Group Description:</label> <br />
//             <input type="text" placeholder="Enter group description" required />   
//           </div>


//           <button className='create-button'>
//             Create Group
//           </button>


//         </form>
//     </div>
//     </div>
//     </>
//   )

// };

// export default Creategroup;
import React from 'react'
import '../CreateGroup/creategroup.css';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Creategroup = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar activePage="createGroup" setActivePage={() => {}} />
      <div className='createGroup-Container'>
        <div className='create_group'>
          <form action="">
            <h1>Create Group</h1>

            {/* Group Name */}
            <div className="group-name-container">
              <label className="groupname">Group Name:</label> 
              <input type="text" placeholder="" required />
            </div>

            {/* Group Logo */}
            <div className="group-logo-container">
              <label className="grouplogo">Logo:</label>
              <div className="input-button">
                <input type="text" placeholder="" required />
                <button className='logo-button'>Add Logo</button>
              </div>
            </div>

            {/* Group Cover */}
            <div className="group-cover-container">
              <label className="groupcover">Cover:</label> 
              <div className="input-button">
                <input type="text" placeholder="" required />
                <button className='cover-button'>Add Cover</button>
              </div>
            </div>

            {/* Group Topic */}
            <div className="group-topic-container">
              <label className="topic">Topic:</label> 
              <input type="text" placeholder="" required />
            </div>

            {/* Group Description */}
            <div className="group-description-container">
              <label className="groupdescription">Group Description:</label>
              <input type="text" placeholder="" required />
            </div>

            {/* Create Group Button */}
            <button className='create-button'>Create Group</button>

          </form>
        </div>
      </div>
    </>
  )
};

export default Creategroup;
