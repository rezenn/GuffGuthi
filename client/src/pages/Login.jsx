import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Unified import

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = inputs;
  const navigate = useNavigate();

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        localStorage.setItem("user_id", parseRes.user_id);
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully!");
        navigate("/home");
      } else {
        setAuth(false);
        toast.error(parseRes.error || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
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
              <input
                className={style.input}
                type="email"
                placeholder="Your Email Address"
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
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <FaEyeSlash className={style.eyeIcon} />
                  ) : (
                    <FaEye className={style.eyeIcon} />
                  )}
                </button>
              </div>

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
