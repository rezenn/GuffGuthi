// import React from "react";
import styles from "./Conversation.module.css";
// import useConversation from "../../zustand/useConversation";
// // import { useSocketContext } from "../../context/SocketContext";

// function Conversation({ conversation }) {
//   const { selectedConversation, setSelectedConversation } = useConversation();

//   const isSelected = selectedConversation?._id === Conversation._id;
//   return (
//     <>
//       <div
//         className={styles.container}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         <div className={styles.avtarImg}>
//           <img
//             id={styles.avtar}
//             src={"./src/assets/profile.jpg" || conversation.profilePic}
//             alt="profile"
//           />
//         </div>
//         <div>
//           <p className={styles.name}>{conversation.fullName}</p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Conversation;

import React from "react";
// import styles from "./Conversation.module.css";
// import useConversation from "../../zustand/useConversation";
// import { useSocketContext } from "../../context/SocketContext";

function Conversation() {
  return (
    <div className={styles.conversation}>
      <img
        className={styles.conversationImg}
        src="./src/assets/profile.jpg"
        alt=""
      />
      <span className={styles.conversationName}>Royan Guy</span>
    </div>
  );
}
export default Conversation;
