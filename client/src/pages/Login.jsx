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
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const { email, password } = inputs;
  const navigate = useNavigate();

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("email", email);
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
        navigate("/home"); // Redirect to home after login
      } else {
        setAuth(false);
        toast.error(parseRes.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err.message);
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
                onChange={onChange}
                required
              />
              <br />
              <label className={style.label}>Password</label>
              <br />
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
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <br />
              <Link className={style.forgotPassword} to="/ForgotPassword">
                Forgot password?
              </Link>
              <button
                className={style.createAccount}
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p>
              Don't have an account?
              <Link to="/Register"> Register now</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
