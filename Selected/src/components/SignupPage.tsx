import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (username != "" && password != "") {
      try {
        const response = await axios.post("http://127.0.0.1:5000/create-user", {
          username,
          password,
        });

        if (response.data.message) {
          alert("Signup successful! Please log in.");
          navigate("/");
        } else {
          alert("Signup failed. Username may already be taken.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("Failed to sign up. Please try again.");
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Create an Account</h1>

      <input
        type="text"
        placeholder="Choose a username"
        className="mb-4 p-2 border rounded w-64"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Choose a password"
        className="mb-4 p-2 border rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mb-2"
      >
        Sign Up
      </button>

      {/* Back to login */}
      <button
        onClick={() => navigate("/")}
        className="text-blue-600 underline mt-2"
      >
        Already have an account? Log In
      </button>
    </div>
  );
};

export default SignupPage;
