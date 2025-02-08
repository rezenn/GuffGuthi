// import React, { useEffect, useState } from "react";
// import Conversation from "./Conversation";

// function Conversations() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/messages/all")
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   return (
//     <div>
//       <h2>Users</h2>
//       {users.length > 0 ? (
//         users.map((user) => (
//           <Conversation
//             key={user.user_id}
//             conversation={user}
//             onClick={() => console.log("Clicked:", user.user_name)} // You can handle clicking on a conversation
//           />
//         ))
//       ) : (
//         <p>No users available</p>
//       )}
//     </div>
//   );
// }

// export default Conversations;
