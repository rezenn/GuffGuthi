import React, { useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { name, email, password } = inputs;
  const navigate = useNavigate();

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { name, email, password };

      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        navigate("/login");
      } else {
        console.error("No token in the response.");
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

            <h2>Create your free Account</h2>
            <form onSubmit={onSubmitForm}>
              <label className={style.label}>Username</label>
              <input
                className={style.input}
                type="text"
                placeholder="Username"
                name="name"
                value={name}
                required
                onChange={onChange}
              />

              <label className={style.label}>Email</label>
              <input
                className={style.input}
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={onChange}
                required
              />

              <label className={style.label}>Password</label>
              <div className={style.passwordContainer}>
                <input
                  className={style.input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <button
                  type="button"
                  className={style.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility" // Add this line
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button className={style.createAccount} type="submit">
                Create Account
              </button>
            </form>
            <p>
              Already have an account?
              <Link to="/Login"> Login now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
