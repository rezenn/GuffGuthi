import React from "react";
import style from "./Login.module.css";
import { Link,useNavigate  } from "react-router-dom";

function Login(){
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        navigate("/Home"); // Navigate to the Home page after form submission

     
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
           
                    <h2>Login to your Account</h2>
                    <form onSubmit={handleSubmit}>
                        <label className={style.label}>Email</label>
                        <br />
                        <input className={style.input} type="email" placeholder="Your Email Address" required />
                        <br />
                        <label className={style.label}s>Password</label>
                        <br />
                        <input className={style.input} type="password" placeholder="Password" required />
                        <br />
                        <Link className={style.forgotPassword} to="/ForgotPassword">Forgot password </Link>
                        <button className={style.createAccount} 
                                type="submit">Login
                        </button>
                    </form>
                    <p>
                        Don't have an account?
                        <Link to="/Register"> Register now</Link>
                    </p>
                </div>               
            </div>
            </body>
        </>
    );
}
export default Login;

