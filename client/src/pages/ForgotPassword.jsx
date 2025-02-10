import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword({ setAuth }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const { email, password, confirmPassword } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true); // Start loading

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
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
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
              <label className={style.label}>New Password</label>
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
              <button
                className={style.createAccount}
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Change Password"}
              </button>
            </form>
            <p>
              Password Changed?
              <Link to="/Login"> Login now</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;
