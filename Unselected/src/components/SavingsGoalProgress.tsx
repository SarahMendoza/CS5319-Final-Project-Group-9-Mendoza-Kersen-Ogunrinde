import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.tsx';

const SavingsGoalProgress = () => {
  const [goalAmount, setGoalAmount] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);
  const [newGoalAmount, setNewGoalAmount] = useState(0); 
  const [newSavedAmount, setNewSavedAmount] = useState(0);

  // Fetch the current goal and progress from your API or static data
  useEffect(() => {
    fetch('http://127.0.0.1:5000/savings-goal', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setGoalAmount(data.goalAmount);
        setSavedAmount(data.savedAmount);
      })
      .catch((err) => console.error('Error fetching savings goal:', err));
  }, []);

  // Handle the submission of a new savings goal
  const handleSaveGoal = () => {
    fetch('http://127.0.0.1:5000/savings-goal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        goalAmount: newGoalAmount,
        savedAmount: newSavedAmount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoalAmount(newGoalAmount);
        setSavedAmount(newSavedAmount);
        alert('Savings goal set successfully!');
      })
      .catch((err) => {
        console.error('Error setting savings goal:', err);
        alert('Failed to set savings goal');
      });
  };

  const progress = (savedAmount / goalAmount) * 100;

  return (
    <div className="flex h-screen">
      <Sidebar />  {/* Add Sidebar here */}

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="p-6 bg-white rounded shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Savings Goal Progress</h3>
          <div className="mb-4">
            <p className="text-lg">Goal: ${goalAmount}</p>
            <p className="text-lg">Saved: ${savedAmount}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-4 rounded mb-2">
            <div
              className="h-4 bg-green-500 rounded"
              style={{ width: `${Math.min(progress, 100)}%` }} 
            ></div>
          </div>

          <p className="text-sm text-gray-500">{Math.round(progress)}% saved</p>

          <div className="mt-6">
            <h4 className="text-lg font-semibold">Set New Savings Goal</h4>
            <input
              type="number"
              placeholder="Enter new goal amount"
              className="w-full p-2 border rounded mb-4"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(parseFloat(e.target.value))}
            />
            <h4 className="text-lg font-semibold">Enter Amount of Saving's Goal Saved</h4>
            <input
              type="number"
              placeholder="Enter saved amount"
              className="w-full p-2 border rounded mb-4"
              value={newSavedAmount}
              onChange={(e) => setNewSavedAmount(parseFloat(e.target.value))}
            />
            <button
              onClick={handleSaveGoal}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save New Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalProgress;
