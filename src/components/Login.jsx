import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../auth/AuthProvider";

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!usernameOrEmail.trim()) formErrors.usernameOrEmail = "Username is required";
    if (!password.trim()) formErrors.password = "Password is required";

    setErrors(formErrors);
    if (Object.keys(formErrors).length !== 0) return;

    try {
      setLoading(true);

      const res = await api.post("/login", {
        userName: usernameOrEmail,
        password: password
      });

      // store jwt
      login(res.data.token);

      // redirect to protected route
      navigate("/admin");

    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Invalid username or password"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
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

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {errors.api && <span className="error">{errors.api}</span>}
        </form>
      </div>
    </div>
  );
}

export default Login;
