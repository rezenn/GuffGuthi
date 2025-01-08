import Navbar from "../components/navbar/Navbar";
import Chat from "../components/chatINhome/Chat";
import Post from "../components/postInHome/Post";
import "./homePage.css";

function Home(){
    return(
        <>
      <Navbar className="Navbar" activePage="home" setActivePage={() => {}} />
        <h1 className="title">Find something interesting to discuss</h1>
      <Post/>
      <Post/>
      <Post/>
      <Chat/>
        </>
    )
}

export default Home;