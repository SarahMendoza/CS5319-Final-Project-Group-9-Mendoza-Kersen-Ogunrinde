import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/overview');
  };

  const handleSpending = () => {
    navigate('/sheet');
  };

  const handleSavingsGoal = () => {
    navigate('/savings-goal');
  };

  const handleSheet = () => {
    navigate('/budget');
  };

  const handleReset = async () => {
    try {
      await fetch('http://127.0.0.1:5000/reset', {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.clear();
      navigate('/budget');
    } catch (error) {
      console.error('Failed to reset app:', error);
      alert('Something went wrong while resetting.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Something went wrong while logging out.');
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Budget.ly</h2>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left"
          onClick={handleHome}
        >
          Overview
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left"
          onClick={handleSpending}
        >
          Input Spending
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left"
          onClick={handleSavingsGoal}
        >
          Savings Goal Progress
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded text-left"
          onClick={handleSheet}
        >
          Budget Sheet
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleReset}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
        >
          Reset
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
