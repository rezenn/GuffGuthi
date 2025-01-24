

// import React, { useState } from "react";
// import "./request.css";
// // Uncomment the next line once Navbar is correctly implemented
// // import Navbar from "../navbar/Navbar";

// function Request() {
//   const [selectedPost, setSelectedPost] = useState(null);

//   const posts = [
//     {
//       id: 1,
//       // preview:
//       //   "We have been running volunteering activities for more than a decade now. We have a very high rate of returning volunteers. Many have made Maya their permanent homes also. We have reflections and discussions every evening to prepare for the next day. We also organize free hikes, breakfasts on the hilltop, and local dinners once a week. We have a good mix of support staff including the senior and assistant volunteer coordinators along with academic, construction, and agricultural managers. Most importantly, the school is a huge success with very high demand from the locals. It's also the biggest employment provider in the area. A lot of the graduates work with the school and help in its expansion and volunteers get to experience this grassroots development process first-hand.",
//       title: "Green Framing Assistance",
//       content: `<br>
// <b>About the Program</b>

// We have been running volunteering activities for more than a decade now. We have a very high rate of returning volunteers. Many have made Maya their permanent homes also. We have reflections and discussions every evening to prepare for the next day. We also organize free hikes, breakfasts on the hilltop, and local dinners once a week. We have a good mix of support staff including the senior and assistant volunteer coordinators along with academic, construction, and agricultural managers. Most importantly, the school is a huge success with very high demand from the locals. It's also the biggest employment provider in the area. A lot of the graduates work with the school and help in its expansion and volunteers get to experience this grassroots development process first-hand.

// <b>Highlights</b>

// - Foster Sustainable Farming: Support the community school farm, learn eco-friendly practices, and contribute to local food production.
// - Engage in Community: Immerse yourself in the school farm community, exchange knowledge with local ties.
// - Skill Development: Gain hands-on experience in crop cultivation, livestock care, and farm management within a supportive educational environment.
// - Personal Growth in Education: Expand your horizons, embrace new challenges, and develop a deeper understanding of the intersection between agriculture and education.
// - Empower Future Generations: Make a lasting impact by helping students learn about sustainable farming, fostering their passion for agriculture, and promoting food security within the community.

// <b>Program Details</b>

// - From: 2024/11/04      
// - To: 2025/12/04  
// - Time: 9 am - 5 pm  
// - Location: Tanahun, Nepal
//       `,
//     },
//     {
//       id: 2,
//       preview:
//         "Much of Nepalese culture including many other Asian cultures unfortunately do not hold dogs with the same esteem as western cultures.  It is very heartbreaking to see stray dogs everywhere in Nepal.  These dogs are often starving and suffer from various skin disorders, diseases, infected wounds, parasites and related conditions. Many pet owners do not accept responsibility for their pets which are often very poorly looked after and often kicked out of their homes once they’ve grown older.  These animals are then left to fend for themselves on the streets in horrific conditions and with very little love and attention. This program aims to rescue injured and mistreated stray dogs for rehabilitation and safe housing in pet shelters so they can be put up for adoption of released. The project also operates the Animal Birth Control Program to educate pet owners of the importance of having dogs spayed and neutered.   Animals lovers of all kinds are encouraged to apply.  This may be a confronting placement but also very rewarding. ",
//       title: "Stray Dogs Rehabilitation Assistance",
//       content: `
// <b>About the Program</b>
// Much of Nepalese culture including many other Asian cultures unfortunately do not hold dogs with the same esteem as western cultures. It is very heartbreaking to see stray dogs everywhere in Nepal. These dogs are often starving and suffer from various skin disorders, diseases, infected wounds, parasites, and related conditions. Many pet owners do not accept responsibility for their pets which are often very poorly looked after and often kicked out of their homes once they’ve grown older. These animals are then left to fend for themselves on the streets in horrific conditions and with very little love and attention.

// <b>Program Highlights</b>
// - Rescue and Rehabilitation: Rescue injured and mistreated stray dogs for rehabilitation and safe housing in pet shelters.
// - Adoption Program: Facilitate the adoption of rehabilitated dogs into loving homes.
// - Animal Birth Control: Operate the Animal Birth Control Program to educate pet owners on the importance of spaying and neutering.
// - Community Education: Educate the community about responsible pet ownership and animal welfare.
// - Volunteer Opportunities: Engage animal lovers in hands-on care and support for the dogs, providing a rewarding and impactful experience.
//       `,
//     },
//     {
//       id: 3,
//       preview:
//         "Welcome to the captivating realm of Maya Universe, an extraordinary volunteer destination that has enchanted countless individuals seeking purpose and adventure...",
//       title: "School Construction Associate",
//       content: `
// <b>About the Program</b>
// Welcome to the captivating realm of Maya Universe, an extraordinary volunteer destination that has enchanted countless individuals seeking purpose and adventure. For over a decade, our sanctuary of empowerment has welcomed volunteers from diverse backgrounds, offering an unparalleled experience.

// <b>Program Highlights</b>
// - Build Schools and Infrastructure: Participate in constructing and maintaining educational facilities that empower local communities.
// - Hands-On Construction Experience: Gain practical experience in various aspects of construction, from masonry to carpentry.
// - Sustainable Development: Contribute to projects that promote sustainable growth and educational access in rural areas.
// - Community Engagement: Work closely with local residents, fostering meaningful connections and cultural exchange.
// - Personal Growth: Develop valuable skills, embrace new challenges, and make a lasting impact on the community.
//       `,
//     },
//     // Add more posts as needed
//   ];

//   // Handlers
//   const handlePostClick = (post) => {
//     setSelectedPost(post);
//   };

//   const handleBackClick = () => {
//     setSelectedPost(null);
//   };

//   return (
//     <>
//       {/* Uncomment the Navbar once it's correctly implemented */}
//       {/* <Navbar /> */}
//       <div className="dashboard">
//         {/* Dashboard Header */}
//         <div className="dashboard-header">
//           {!selectedPost ? (
//             <>
//               <div className="dashboard-title">Requests</div>
//               <button className="create-button">Create Request</button>
//             </>
//           ) : (
//             <button className="back-button" onClick={handleBackClick}>
//               Back to Requests
//             </button>
//           )}
//         </div>

//         {/* Dashboard Content */}
//         <div className="dashboard-content">
//         {selectedPost ? (
//   <div className="post-details">
//     <h2>{selectedPost.title}</h2>
//     <div dangerouslySetInnerHTML={{ __html: selectedPost.content }}></div>
//   </div>
// ) : (
//   <div className="post-list">
//     {posts.map((post) => (
//       <div
//         key={post.id}
//         className="post-preview"
//         onClick={() => handlePostClick(post)}
//       >
//         <h3>{post.title}</h3>
//         <p>{post.preview}</p>
//       </div>
//     ))}
//   </div>
// )}

//         </div>
//       </div>
//     </>
//   );
// }

// export default Request;

import React, { useState } from "react";
import "./request.css";
// Uncomment the next line once Navbar is correctly implemented
// import Navbar from "../navbar/Navbar";

function Request() {
  const [selectedPost, setSelectedPost] = useState(null);

  // Function to truncate HTML content and extract plain text
  const truncateText = (html, maxLength) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html; // Parse HTML
    const plainText = tempDiv.textContent || tempDiv.innerText || ""; // Extract plain text
    return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
  };

  const posts = [
    {
      id: 1,
      title: "Green Framing Assistance",
      content: `

<b>About the Program</b>

We have been running volunteering activities for more than a decade now. We have a very high rate of returning volunteers. Many have made Maya their permanent homes also. We have reflections and discussions every evening to prepare for the next day. We also organize free hikes, breakfasts on the hilltop, and local dinners once a week. We have a good mix of support staff including the senior and assistant volunteer coordinators along with academic, construction, and agricultural managers. Most importantly, the school is a huge success with very high demand from the locals. It's also the biggest employment provider in the area. A lot of the graduates work with the school and help in its expansion and volunteers get to experience this grassroots development process first-hand.

<b>Highlights</b>

- Foster Sustainable Farming: Support the community school farm, learn eco-friendly practices, and contribute to local food production.
- Engage in Community: Immerse yourself in the school farm community, exchange knowledge with local ties.
- Skill Development: Gain hands-on experience in crop cultivation, livestock care, and farm management within a supportive educational environment.
- Personal Growth in Education: Expand your horizons, embrace new challenges, and develop a deeper understanding of the intersection between agriculture and education.
- Empower Future Generations: Make a lasting impact by helping students learn about sustainable farming, fostering their passion for agriculture, and promoting food security within the community.

<b>Program Details</b>

- From: 2024/11/04      
- To: 2025/12/04  
- Time: 9 am - 5 pm  
- Location: Tanahun, Nepal
      `,
    },
    {
      id: 2,
      title: "Stray Dogs Rehabilitation Assistance",
      content: `
<b>About the Program</b>
Much of Nepalese culture including many other Asian cultures unfortunately do not hold dogs with the same esteem as western cultures. It is very heartbreaking to see stray dogs everywhere in Nepal. These dogs are often starving and suffer from various skin disorders, diseases, infected wounds, parasites, and related conditions. Many pet owners do not accept responsibility for their pets which are often very poorly looked after and often kicked out of their homes once they’ve grown older. These animals are then left to fend for themselves on the streets in horrific conditions and with very little love and attention.

<b>Program Highlights</b>
- Rescue and Rehabilitation: Rescue injured and mistreated stray dogs for rehabilitation and safe housing in pet shelters.
- Adoption Program: Facilitate the adoption of rehabilitated dogs into loving homes.
- Animal Birth Control: Operate the Animal Birth Control Program to educate pet owners on the importance of spaying and neutering.
- Community Education: Educate the community about responsible pet ownership and animal welfare.
- Volunteer Opportunities: Engage animal lovers in hands-on care and support for the dogs, providing a rewarding and impactful experience.
     
      `,
    },
    {
      id: 3,
      title: "School Construction Associate",
      content: `
<b>About the Program</b>
Welcome to the captivating realm of Maya Universe, an extraordinary volunteer destination that has enchanted countless individuals seeking purpose and adventure. For over a decade, our sanctuary of empowerment has welcomed volunteers from diverse backgrounds, offering an unparalleled experience.

<b>Program Highlights</b>
- Build Schools and Infrastructure: Participate in constructing and maintaining educational facilities that empower local communities.
- Hands-On Construction Experience: Gain practical experience in various aspects of construction, from masonry to carpentry.
- Sustainable Development: Contribute to projects that promote sustainable growth and educational access in rural areas.
- Community Engagement: Work closely with local residents, fostering meaningful connections and cultural exchange.
- Personal Growth: Develop valuable skills, embrace new challenges, and make a lasting impact on the community.
      `,
    },
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <>
      {/* Uncomment the Navbar once it's correctly implemented */}
      {/* <Navbar /> */}
      <div className="dashboard">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          {!selectedPost ? (
            <>
              <div className="dashboard-title">Requests</div>
              <button className="create-button">Create Request</button>
            </>
          ) : (
            <button className="back-button" onClick={handleBackClick}>
              Back to Requests
            </button>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {selectedPost ? (
            <div className="post-details">
              <h2>{selectedPost.title}</h2>
              <div
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              ></div>
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
                  <p>{truncateText(post.content, 150)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Request;
