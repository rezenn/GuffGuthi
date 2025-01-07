import Navbar from "../components/navbar/Navbar";
import post from "../components/post";
import { Link } from "react-router-dom";


function home(){
    return(
        <>
        
        <Navbar />
        <post/>
        </>
    )
}

export default home;