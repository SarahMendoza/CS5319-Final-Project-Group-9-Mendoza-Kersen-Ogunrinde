import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  // Check if already logged in (by username in localStorage)
  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      navigate('/overview');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Username and password required');
      return;
    }

    try {
      const endpoint = isSignup ? '/signup' : '/login';
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // include cookies for session
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('username', username); // store in localStorage
        navigate('/overview');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Server error. Try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Budget.ly</h1>
      <p className="text-lg text-gray-600 mb-6">
        {isSignup ? 'Create a new account' : 'Log into your account'}
      </p>

      <input
        type="text"
        placeholder="Username"
        value={username}
        className="mb-4 p-2 border rounded w-64"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        className="mb-4 p-2 border rounded w-64"
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

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
