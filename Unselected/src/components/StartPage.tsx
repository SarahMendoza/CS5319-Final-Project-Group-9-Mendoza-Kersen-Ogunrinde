import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle login button click
  const handleLogin = async () => {
    if (username && password) {
      try {
        // Send POST request to your backend login endpoint
        const response = await axios.post("http://localhost:5000/api/login", {
          username,
          password,
        });

        // Assuming your backend returns { success: true, token: "...", username: "..." }
        if (response.data.message) {
          // Optionally save token in localStorage or context
          localStorage.setItem("token", response.data.token);
          navigate("/overview");
        } else {
          alert("Invalid username or password.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Failed to login. Please try again.");
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Budget.ly</h1>

      {/* Greeting */}
      <div className="mb-4">
          <h2 className="text-2xl">Hello, {username}!</h2>
         : (
          <h2 className="text-2xl">Enter your username and password</h2>
        )
      </div>

    {/* Input fields for username and password */}
      <>
        <input
          type="text"
          placeholder="Enter your username"
          className="mb-4 p-2 border rounded w-64"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="mb-4 p-2 border rounded w-64"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </>

      {/* Button to start using the app */}
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Start Using Budget.ly
      </button>
      {/* Signup button */}
      <button
        onClick={() => navigate("/signup")}
        className="text-blue-600 underline mt-2"
      >
        Don't have an account? Sign Up
      </button>
    </div>
  );
};

export default AuthPage;
