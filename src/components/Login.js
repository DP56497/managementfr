// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("http://localhost:3050/api/login", formData);
    console.log("Login response:", res.data);

    if (res.data.success) {
      // ✅ Store all user details from backend
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("category", res.data.user.category);
      localStorage.setItem("token", res.data.token);

      navigate("/home");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={() => navigate("/home")}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
