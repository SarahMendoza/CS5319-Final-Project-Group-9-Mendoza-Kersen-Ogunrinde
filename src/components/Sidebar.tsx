// src/components/Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();
  
  const handleSpending = () => {
    navigate('/sheet');
  }

  const handleGoal = () => {
    navigate('/goal');
  }

  const handleSheet = () => {
    navigate('/budget')
  }

  const handleOverview = () => {
    navigate('/overview');
  };

  const handleReset = async () => {
    try {
      await fetch('http://127.0.0.1:5000/reset', {
        method: 'POST'
      });
  
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Failed to reset app:', error);
      alert('Something went wrong while resetting.');
    }
  };  

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Budget.ly</h2>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left" onClick={handleOverview}>
        Overview
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left" onClick={handleSpending}>
        Input Individual Expenses
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left" onClick={handleGoal}>
        Input Goals
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded text-left" onClick={handleSheet}>
        Input Budget Cost
      </button>

      <button
      onClick={handleReset}
      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-auto rounded"
    >
      Reset & Start Over
    </button>

    </div>
  );
};

export default Sidebar;
