import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
      navigate("/overview");
    }
  }, [navigate]);

  // Handle login button click
  const handleLogin = () => {
    if (username) {
      localStorage.setItem("username", username); // Save the username in localStorage
      setIsLoggedIn(true); // Mark as logged in
      navigate("/overview"); // Navigate to overview page
    } else {
      alert("Please enter a username.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Budget.ly</h1>

      {/* Greeting */}
      <div className="mb-4">
        {isLoggedIn ? (
          <h2 className="text-2xl">Hello, {username}!</h2>
        ) : (
          <h2 className="text-2xl">Enter your username and password</h2>
        )}
      </div>

      {/* Input fields for username and password */}
      {!isLoggedIn && (
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
      )}

      {/* Button to start using the app */}
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Start Using Budget.ly
      </button>
    </div>
  );
};

export default AuthPage;
