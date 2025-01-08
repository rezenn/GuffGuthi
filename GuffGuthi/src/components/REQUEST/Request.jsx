import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./request.css";
import Navbar from "../navbar/Navbar";

function CommunityServices() {
  const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/PostRequest'); 
    };

  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      preview: "We have been running volunteering activities for more than a decade now. We have a very high rate of returning volunteers. Many have made Maya their permanent homes also. We have reflections and discussions every evening to prepare for the next day. We also organize free hikes, breakfasts on the hilltop, and local dinners once a week. We have a good mix of support staff including the senior and assistant volunteer coordinators along with academic, construction, and agricultural managers. Most importantly, the school is a huge success with very high demand from the locals. Its also the biggest employment provider in the area. A lot of the graduates work with the school and help in its expansion and volunteers get to experience this grassroots development process first-hand.",
      title: "Green Framing Assistance",
      content: "Full Details",
    },
    {
      id: 2,
      preview: "Much of Nepalese culture including many other Asian cultures unfortunately do not hold dogs with the same esteem as western cultures.  It is very heartbreaking to see stray dogs everywhere in Nepal.  These dogs are often starving and suffer from various skin disorders, diseases, infected wounds, parasites and related conditions. Many pet owners do not accept responsibility for their pets which are often very poorly looked after and often kicked out of their homes once they’ve grown older.  These animals are then left to fend for themselves on the streets in horrific conditions and with very little love and attention. This program aims to rescue injured and mistreated stray dogs for rehabilitation and safe housing in pet shelters so they can be put up for adoption of released. The project also operates the Animal Birth Control Program to educate pet owners of the importance of having dogs spayed and neutered.   Animals lovers of all kinds are encouraged to apply.  This may be a confronting placement but also very rewarding. ",
      title: "Stray Dogs Rehabilitation Assistance",
      content: "Full Details.",
    },
    {
      id: 3,
      preview: "Welcome to the captivating realm of Maya Universe, an extraordinary volunteer destination that has enchanted countless individuals seeking purpose and adventure. For over a decade, our sanctuary of empowerment has welcomed volunteers from diverse backgrounds, offering an unparalleled experience.",
      title: "School Construction Associate",
      content: "Full Details",
    },
    // Add more posts as needed
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <Navbar className="Navbar" activePage="communityServices" setActivePage={() => {}} />
      <div className="dashboard">
        <div className="dashboard-header">
          {!selectedPost ? (
            <>
              <div className="dashboard-title">Requests</div>
              <button onClick={handleNavigate} className="create-button">Create Request</button>
            </>
          ) : (
            <button className="back-button" onClick={handleBackClick}>
              Back to Requests
            </button>
          )}
        </div>
        <div className="dashboard-content">
          {selectedPost ? (
            <div className="post-details">
              <h2>{selectedPost.title}</h2>
              <p>{selectedPost.content}</p>
            </div>
          ) : (
            <div className="post-list">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="post-preview"
                  onClick={() => handlePostClick(post)}
                >
                  <h3>{post.title}</h3>
                  <p>{post.preview}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CommunityServices;
