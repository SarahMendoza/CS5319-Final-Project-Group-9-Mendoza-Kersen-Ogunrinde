import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const endpoint = isSignup ? '/signup' : '/login';
    const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('username', username);
      navigate('/overview');
    } else {
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Budget.ly</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded w-64"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {isSignup ? 'Sign Up' : 'Login'}
      </button>
      <p className="mt-4 text-sm text-gray-600">
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          className="text-blue-600 underline"
          onClick={() => {
            setIsSignup(!isSignup);
            setError('');
          }}
        >
          {isSignup ? 'Log in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
};

export default StartPage;
