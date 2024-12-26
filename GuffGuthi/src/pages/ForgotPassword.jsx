import React from "react";
import './login.css'
// import './index.css'; 

import { Link } from "react-router-dom";

function ForgotPassword(){
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
     
    };

    return(
        <>
            <div id="regLog">
                <div>
                <img className="backgroundImg" src="./src/assets/background.png" alt="background" />
                    
                </div> 

                <div id="login">
                    <img className="logo" 
                        src="./src/assets/logo.png"
                        alt="Logo" 
                    />
           
                    <h2>Reset your account password</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <br />
                        <input type="email" placeholder="Your Email Address" required />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" placeholder="Password" required />
                        <br />
                        <label>Confirm Password</label>
                        <br />
                        <input type="password" placeholder="Confirm Password" required />
                        <br />
                        <button className="createAccount" 
                                type="submit">Change Password
                        </button>
                    </form>
                    <p>
                        Password Changed? 
                        <Link to="/Login"> Login now</Link>
                    </p>
                </div>               
            </div>
        </>
    );
}
export default ForgotPassword;

