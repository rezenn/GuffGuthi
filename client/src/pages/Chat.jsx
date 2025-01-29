import Navbar from "../components/navbar/Navbar";
import Profile from "../components/profileComponents/Profile";
import "./Chat.css"


const chatList = [
    { name: "Lois Griffin", message: "Sent you a message", time: "34m" },
    { name: "The Boyz", message: "joe68: sent a message", time: "34m" },
    { name: "Stewie Griffin", message: "Sent you a message", time: "17h" },
    { name: "Joe Swanson", message: "Sent you a message", time: "17h" },
    { name: "Glenn Quagmire", message: "The silence lmao", time: "20h" },
    { name: "Herbert", message: "Active", time: "6m ago" },
    { name: "Adam West", message: "Active", time: "Today" },
    { name: "Philip J. Fry", message: "You're welcome! It's always nic...", time: "20h" },
  ];
  
  const messages = [
    { sender: "Philip J. Fry", text: "I'm open to anything, but I'd love to help with community events or activities that involve teaching or mentoring." },
    { sender: "You", text: "That's fantastic! There's a local community center that often needs volunteers for their youth programs." },
    { sender: "Philip J. Fry", text: "That sounds perfect. Do you know how I can get in touch with them?" },
    { sender: "You", text: "Yes, they have a website where you can sign up, or you can visit them directly. I can share their contact details if you'd like." },
    { sender: "Philip J. Fry", text: "That would be great, thank you! I appreciate your help." },
    { sender: "You", text: "You're welcome! It's always nice to see people wanting to give back to the community." },
  ];

function Chat(){
    return(
        <>
        <Navbar activePage="chat" setActivePage={() => {}} />
        <Profile/>
        <div className="chat-container">
      {/* Chat List Sidebar */}
      <div className="chat-sidebar">
        <h2>Chats</h2>
        {chatList.map((chat, index) => (
          <div
            key={index}
            className={`chat-item ${selectedChat.name === chat.name ? "active" : ""}`}
            onClick={() => setSelectedChat(chat)}
          >
            <div className="chat-avatar">{chat.name.charAt(0)}</div>
            <div className="chat-info">
              <p className="chat-name">{chat.name}</p>
              <p className="chat-message">{chat.message}</p>
            </div>
            <div className="chat-time">{chat.time}</div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">{selectedChat.name}</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  
        
        </>
        
    )
}

export default Chat;