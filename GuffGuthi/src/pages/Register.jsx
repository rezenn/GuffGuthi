import React from "react";
import './login.css'
import { Link } from "react-router-dom";

function Register(){
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
           
                    <h2>Create your free Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <br />
                        <input type="text" placeholder="Username" required />
                        <br />
                        <label>Email</label>
                        <br />
                        <input type="email" placeholder="Email Address" required />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" placeholder="Password" required />
                        <br />
                        <button className="createAccount" 
                                type="submit">Create Account
                        </button>
                    </form>
                    <p>
                        Already have an account? 
                        <Link to= "/Login"> Login now</Link>
                    </p>
                </div>               
            </div>
        </>
    );
}
export default Register;

