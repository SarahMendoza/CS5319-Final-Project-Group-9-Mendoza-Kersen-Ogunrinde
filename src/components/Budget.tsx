import React from 'react';
import Sidebar from './Sidebar.tsx';
import ExpenseForm from './ExpenseForm.tsx';

const Budget = () => {
    const handleSpending = () => {
        //submit axios request to send expenses to database
        // TODO -----------------------
    }

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

            {/* Content Area */}
            <div className="flex flex-col items-center justify-start flex-1 gap-12 py-12">
                {/* Step 1 */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-600 mb-4">1: Set your monthly income</h2>
                    <input
                    type="text"
                    placeholder="Enter income here"
                    className="w-64 p-2 rounded border border-gray-300"
                    />
                </div>

                {/* Step 2 */}
                <div>
                    <ExpenseForm />
                </div>
            </div>
        </div>
        </div>

    );
};
  
export default Budget;