import React from "react";
import './login.css'
import { Link } from "react-router-dom";

function Login(){
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
           
                    <h2>Login to your Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <br />
                        <input type="email" placeholder="Your Email Address" required />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" placeholder="Password" required />
                        <br />
                        <Link className="forgotPassword" to="/ForgotPassword">Forgot password </Link>
                        <button className="createAccount" 
                                type="submit">Login
                        </button>
                    </form>
                    <p>
                        Don't have an account?
                        <Link to="/Register"> Register now</Link>
                    </p>
                </div>               
            </div>
        </>
    );
}
export default Login;

