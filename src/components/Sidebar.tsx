// src/components/Sidebar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate();
  
  const handleSpending = () => {
<<<<<<< HEAD
    navigate('/spending')
=======
    navigate('/sheet');
>>>>>>> 1044caa091bb09f0f6e143afe540e69e9d77ffc1
  }

  const handleGoal = () => {
    navigate('/goal');
  }

  const handleSheet = () => {
    navigate('/budget')
  }

  const handleHome = () => {
    navigate('/')
  }

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Budget.ly</h2>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left" onClick={handleHome}>
        Home
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left" onClick={handleSpending}>
        Input Spending
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mb-4 text-left" onClick={handleGoal}>
        Input Goal
      </button>
      <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded text-left" onClick={handleSheet}>
        Budget Sheet
      </button>
    </div>
  );
};

export default Sidebar;
