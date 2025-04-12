import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.tsx';

const Goal = () => {
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState('');
  const [goals, setGoals] = useState([]);

  // Fetch existing goals on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:5000/goals')
      .then(res => res.json())
      .then(data => setGoals(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Error fetching goals:', err);
        setGoals([]); // fallback if something goes wrong
      });
  }, []);

  // Handle new goal submission
  const submitGoal = () => {
    fetch('http://127.0.0.1:5000/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        target: parseFloat(target),
        current: 0
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          setGoals([...goals, data.goal]);
          setTitle('');
          setTarget('');
        }
      })
      .catch(err => {
        console.error('Error submitting goal:', err);
        alert('Failed to submit goal');
      });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        {/* Title Section */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Your Savings Goals</h1>
          <p className="text-xl text-gray-600 mb-8">Add and track your financial goals</p>

          {/* Add New Goal Form */}
          <div className="bg-white p-6 shadow rounded max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Add New Goal</h2>
            <input
              type="text"
              placeholder="Goal title (e.g. Emergency Fund)"
              className="w-full p-2 mb-4 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Target amount (e.g. 500)"
              className="w-full p-2 mb-4 border rounded"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
            <button
              onClick={submitGoal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Goal
            </button>
          </div>
        </div>

        {/* Goals List */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Current Goals</h2>
          {goals.length === 0 ? (
            <p className="text-gray-500">No goals yet. Add one above!</p>
          ) : (
            goals.map((goal, idx) => {
              const progress = (goal.current / goal.target) * 100;

              return (
                <div key={idx} className="mb-6 p-4 bg-white shadow rounded">
                  <h3 className="text-xl font-bold text-gray-700">{goal.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    ${goal.current} saved of ${goal.target}
                  </p>
                  <div className="w-full bg-gray-200 h-4 rounded mb-2">
                    <div
                      className="h-4 bg-green-500 rounded"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>

                  {/* Update form */}
                  <input
                    type="number"
                    placeholder="Enter new saved amount"
                    className="w-1/2 p-2 border rounded mr-2"
                    value={goal.newProgress || ''}
                    onChange={(e) => {
                      const newGoals = [...goals];
                      newGoals[idx].newProgress = e.target.value;
                      setGoals(newGoals);
                    }}
                  />
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      fetch(`http://127.0.0.1:5000/goals/${idx}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ current: parseFloat(goal.newProgress) })
                      })
                        .then(res => res.json())
                        .then(data => {
                          const updatedGoals = [...goals];
                          updatedGoals[idx] = data.goal;
                          setGoals(updatedGoals);
                        })
                        .catch(err => {
                          console.error('Error updating goal:', err);
                          alert('Failed to update goal');
                        });
                    }}
                  >
                    Save Progress
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Goal;
