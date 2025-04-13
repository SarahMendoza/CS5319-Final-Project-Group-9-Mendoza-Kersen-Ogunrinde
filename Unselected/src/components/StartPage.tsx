import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);

  // Retrieve the name from localStorage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setName(storedName); // If the name exists, set it
      setIsNameSet(true); // Mark that the name has been set
      navigate('/overview'); // Automatically navigate to overview if name exists
    }
  }, [navigate]);

  // Save the name and navigate to the overview page
  const handleStart = () => {
    if (name) {
      localStorage.setItem('username', name); // Store the name in localStorage
      setIsNameSet(true); // Mark name as set
      navigate('/overview'); // Navigate to overview page
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Budget.ly</h1>

      {/* Personalize the greeting message */}
      <div className="mb-4">
        {isNameSet ? (
          <h2 className="text-2xl">Hello, {name}!</h2> // Greet the user with their name if set
        ) : (
          <h2 className="text-2xl">What’s your name?</h2> // If name not set, ask for it
        )}
      </div>

      {/* Input to get the user’s name, only shown if the name isn't set yet */}
      {!isNameSet && (
        <input
          type="text"
          placeholder="Enter your name"
          className="mb-4 p-2 border rounded w-64"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update the name as user types
        />
      )}

      {/* Start using the app button */}
      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Start Using Budget.ly
      </button>
    </div>
  );
};

export default StartPage;
