import React from 'react';
import Sidebar from './Sidebar.tsx';

const Budget = () => {
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
                />
            </div>
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