import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';

const Budget = () => {

    // useState for income
    const [income, setIncome] = useState('');

    // useState for animation
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    //submit budget function
    const submitBudget = () => {
        fetch('http://127.0.0.1:5000/budget', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ amount: parseFloat(income) })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Budget response:', data);
            
          //animate confirmation
          setShowSuccess(true);

          // after 1 seconds, redirect to "/sheet"
          setTimeout(() => {
            setShowSuccess(false);
            navigate('/sheet');
          }, 1000);
        })
        .catch(error => {
          console.error('Error setting budget:', error);
          alert('Failed to set budget');
        });
      };
      

    return (
        <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64">
            <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 bg-gray-100">
            {/* Top Section with Title and Subtitle */}
            <div className="h-48 bg-gray-500 text-white shadow-lg py-8">
            <h1 className="text-5xl text-center font-semibold">Input Monthly Budget</h1>
            <p className="mt-4 text-3xl text-center text-gray-200">
                Follow these steps to create a custom monthly budget
            </p>
            </div>

            {/* first step is to set income */}
            <div className="h-48 bg-gray-100 text-gray-500 py-8">
                <h1 className="text-3xl text-center font-semibold">1: Set your monthly income</h1>
            </div>
            <div className="flex justify-center">
                <input
                type="text"
                placeholder="Enter income here"
                className="relative -translate-y-20 w-64 p-2 rounded border border-gray-300"

                
                // added to allow user to enter income (budget)
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                />
            </div>

            {/*********************************************************************************************************/}


            {/* added to allow user to submit budget */}
            <div className="flex justify-center mt-4">
          <button
            onClick={submitBudget}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Budget
          </button>
        </div>

        {/* add confirmaation animation */}
        {showSuccess && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg transition-all duration-500">
            Thanks for entering your budget! Now enter your expenses...
          </div>
        )}
      </div>
    </div>
  );
};
  
export default Budget;