import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      // Ensure token is saved in localStorage
      if (parseRes.jwtToken) {
        localStorage.setItem("email", email);
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);

        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div id={style.body}>
        <div id={style.regLog}>
          <div id={style.login}>
            <img
              className={style.logo}
              src="./src/assets/logo.png"
              alt="Logo"
            />

            <h2>Login to your Account</h2>
            <form onSubmit={onSubmitForm}>
              <label className={style.label}>Email</label>
              <br />
              <input
                className={style.input}
                type="email"
                placeholder="Your Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
              <label className={style.label}>Password</label>
              <br />
              <input
                className={style.input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
              <Link className={style.forgotPassword} to="/ForgotPassword">
                Forgot password{" "}
              </Link>
              <button className={style.createAccount} type="submit">
                Login
              </button>
            </form>
            <p>
              Don't have an account?
              <Link to="/Register"> Register now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
