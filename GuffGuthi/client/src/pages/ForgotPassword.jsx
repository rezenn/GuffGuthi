import React from "react";
import style from "./Login.module.css";

import { Link } from "react-router-dom";

function ForgotPassword(){
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
     
    };

    return(
        <>
            <body id={style.body}>
            <div id={style.regLog}>
                <div id={style.login}>
                    <img className={style.logo} 
                        src="./src/assets/logo.png"
                        alt="Logo" 
                    />
           
                    <h2>Reset your account password</h2>
                    <form onSubmit={handleSubmit}>
                        <label className={style.label}>Email</label>
                        <br />
                        <input className={style.input} type="email" placeholder="Your Email Address" required />
                        <br />
                        <label className={style.label}>Password</label>
                        <br />
                        <input className={style.input} type="password" placeholder="Password" required />
                        <br />
                        <label className={style.label}>Confirm Password</label>
                        <br />
                        <input className={style.input} type="password" placeholder="Confirm Password" required />
                        <br />
                        <button className={style.createAccount} 
                                type="submit">Change Password
                        </button>
                    </form>
                    <p>
                        Password Changed? 
                        <Link to="/Login"> Login now</Link>
                    </p>
                </div>               
            </div>
            </body>
        </>
    );
}
export default ForgotPassword;

