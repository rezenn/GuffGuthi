import React, { useState, useEffect } from "react";
import style from "./Login.module.css";

import { Link, useNavigate } from "react-router-dom";

function ForgotPassword({ setAuth }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, confirmPassword } = inputs;
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    try {
      const body = { email, newPassword: password };
      const response = await fetch(
        "http://localhost:8000/auth/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parseRes = await response.json();
      alert("Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div id={style.regLog}>
        <div id={style.login}>
          <img className={style.logo} src="./src/assets/logo.png" alt="Logo" />

          <h2>Reset your account password</h2>
          <form onSubmit={onSubmitForm}>
            <label className={style.label}>Email</label>
            <br />
            <input
              className={style.input}
              type="email"
              placeholder="Your Email Address"
              name="email"
              value={email}
              onChange={onChange}
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
              onChange={onChange}
              required
            />
            <br />
            <label className={style.label}>Confirm Password</label>
            <br />
            <input
              className={style.input}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
            />
            <br />
            <button className={style.createAccount} type="submit">
              Change Password
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
