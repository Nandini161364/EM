import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { type Role } from "../../types/register";
import { type SubmitEvent } from "react";

import "./index.css";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<Role>("attendee");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = "http://127.0.0.1:8000/event/user/";
    const requestData = {
      username,
      password,
      email,
      role,
      phone_number,
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
        console.log(data);
        navigate("/login");
      } else {
        const message = data.message ?? data.detail ?? "Registration failed";
        setError(message);
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
      const message =
        error instanceof Error ? error.message : "An error occurred during registration";
      setError(message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-header">
          <div className="logo">
            <span className="logo-icon">📋</span>
            <span className="logo-text">Eventful</span>
          </div>
        </div>

        <div className="register-content">
          <h1 className="register-title">REGISTER — ROLE SELECTION STEP</h1>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="role-selection-section">
              <h2 className="section-title">Choose your role</h2>
              <p className="section-description">
                This determines how you use the platform
              </p>

              <div className="role-options">
                <label
                  className={`role-card ${role === "organizer" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="organizer"
                    checked={role === "organizer"}
                    onChange={(e) => setRole(e.target.value as Role)}
                  />
                  <div className="role-card-content">
                    <span className="role-icon">🎯</span>
                    <span className="role-name">Organizer</span>
                    <span className="role-description">
                      Create & manage events
                    </span>
                  </div>
                  {role === "organizer" && <div className="checkmark">✓</div>}
                </label>

                <label
                  className={`role-card ${role === "attendee" ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="attendee"
                    checked={role === "attendee"}
                    onChange={(e) => setRole(e.target.value as Role)}
                  />
                  <div className="role-card-content">
                    <span className="role-icon">🎟️</span>
                    <span className="role-name">Attendee</span>
                    <span className="role-description">
                      Browse & book events
                    </span>
                  </div>
                  {role === "attendee" && <div className="checkmark">✓</div>}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">NAME</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your full name"
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

            <div className="form-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">PHONE NUMBER</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="create-account-btn">
              Create account
            </button>

            <div className="signin-link">
              <span>Already registered? </span>
              <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
