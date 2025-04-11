import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem('username', name.trim());
      navigate('/budget'); // Go to budget page after entering name
    } else {
      alert('Please enter your name to continue');
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-gray-700 mb-6">Welcome to Budget.ly 🎯</h1>
      <p className="text-lg text-gray-600 mb-6">Let's start by getting your name:</p>
      <input
        type="text"
        placeholder="Enter your name"
        className="w-64 p-3 rounded border border-gray-400 mb-4 text-center"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleStart}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Start Planning
      </button>
    </div>
  );
};

export default StartPage;
