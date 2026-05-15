import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { type SubmitEvent } from "react";

import "./index.css";
import { observer } from "mobx-react-lite";

import authStore from "../../stores/authstore";

const Login = observer(() => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    if (authStore.isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const onLogin = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const apiUrl = "http://127.0.0.1:8000/api/token/";
        const requestData = {
            username,
            password,
        };

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        };

        try {
            const response = await fetch(apiUrl, options);
            const data = await response.json();
            if (response?.ok === true) {
                setError("");
                authStore.login(data.access ?? "", data.refresh ?? "");
                navigate("/");
            } else {
                const message = data.message ?? data.detail ?? "Login failed";
                authStore.logout();
                setError(message);
                console.log("Login failed");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            const message =
                error instanceof Error ? error.message : "An error occurred during login";
            setError(message);
        }
    };


  return (
    <section className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <div className="logo">
            <span className="logo-icon">📋</span>
            <span className="logo-text">Eventful</span>
          </div>
        </div>

        <div className="login-content">
          <h1 className="login-title">LOGIN</h1>

          <form className="login-form" onSubmit={onLogin}>
            <div className="form-group">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-btn">
              Login
            </button>

            <div className="signup-link">
              <span>Don't have an account? </span>
              <Link to="/register">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
})

export default Login;
