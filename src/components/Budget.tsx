import React, { useState } from 'react';
import Sidebar from './Sidebar.tsx';

const Budget = () => {

    //added to allow user enter income
    const [income, setIncome] = useState('');

    //submit budget function
    const submitBudget = () => {
        fetch('http://127.0.0.1:5000/budget', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: parseFloat(income) })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Budget response:', data);
          alert(`Budget set to $${data.budget}`);
        })
        .catch(error => {
          console.error('Error setting budget:', error);
          alert('Failed to set budget');
        });
      };
      

    return (
      <div className="flex h-screen">
        <div>
            <Sidebar />
        </div>
        <div className="flex-1 flex-column bg-gray-100">
            <div className="h-48 bg-gray-500 text-white shadow-lg py-8">
                <h1 className="text-5xl text-center font-semibold">Input Monthly Budget</h1>
                <p className="mt-4 text-3xl text-center text-gray-200">Follow these steps to create a custom monthly budget</p>
            </div>
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

            {/*********************************************************************************************************/}

            <div>
                <div className="h-48 bg-gray-100 text-gray-500 py-4">
                    <h1 className="text-3xl text-center font-semibold">2: Add expenses</h1>
                </div>
                <div className="flex justify-center">
                    <input
                    type="text"
                    placeholder="Enter expenses here"
                    className="w-64 p-2 relative -translate-y-20 rounded border border-gray-300"
                    />
                </div>
            </div>
        </div>
        <div>
        
        </div>
      </div>
    );
};
  
export default Budget;