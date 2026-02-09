import React, { useState } from "react";
import "./Login.css";
import Adminpanel from "./Adminpanel";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!usernameOrEmail.trim()) formErrors.usernameOrEmail = "Username or Email is required";
    if (!password.trim()) formErrors.password = "Password is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    return <Adminpanel />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter email"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            {errors.usernameOrEmail && <span className="error">{errors.usernameOrEmail}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          {/* <p className="forgot-password">Forgot Password?</p> */}

        </form>
      </div>
    </div>
  );
}

export default Login;
