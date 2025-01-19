import React, { useState } from "react";
import style from "./Login.module.css";
import { Link } from "react-router-dom";

function Register({setAuth}){
    

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {name, email, password} = inputs;
    const onChange = (e) => 
        setInputs({...inputs, [e.target.name]
            : e.target.value
        });
    
    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            // 
            const body = {name, email, password}
            
            const response = await fetch
            ("http://localhost:8000/auth/register",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},

                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.jwtToken) {
                localStorage.setItem("token", parseRes.jwtToken);
                setAuth(true);

            } else {
                console.error("No token in the response.");
            }
      

        } catch (err) {
            console.error(err.message)
            
        }
    }
    

    return(
        <>
            <div id={style.body}>
            <div id={style.regLog}>
                

                <div id={style.login}>
                    <img className={style.logo} 
                        src="./src/assets/logo.png"
                        alt="Logo" 
                    />
           
                    <h2>Create your free Account</h2>
                    <form onSubmit={onSubmitForm}>
                        <label className={style.label}>Username</label>
                        <br />
                        <input 
                        className={style.input}
                         type="text" 
                         placeholder="Username"
                         name="name"
                         value={name} 
                         required 
                         onChange={e => onChange(e)}/>
                        <br />
                        <label className={style.label}>Email</label>
                        <br />
                        <input
                         className={style.input} 
                        type="email" 
                        placeholder="Email Address"
                        name="email"
                        value={email} 
                        onChange={e => onChange(e)}
                        required />
                        <br />
                        <label className={style.label}>Password</label>
                        <br />
                        <input
                        className={style.input} 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        value={password} 
                        onChange={e => onChange(e)}
                        required />
                        <br />
                        <button className={style.createAccount} 
                                type="submit">Create Account
                        </button>
                    </form>
                    <p>
                        Already have an account? 
                        <Link to= "/Login"> Login now</Link>
                    </p>
                </div>               
            </div>
            </div>
        </>
    );
}
export default Register;

