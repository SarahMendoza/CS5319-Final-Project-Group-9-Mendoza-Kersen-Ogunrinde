import React from 'react';
import Sidebar from './Sidebar.tsx';

const Goal = () => {
    return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 bg-gray-100">
        <div className="h-48 bg-gray-500 text-white shadow-lg py-8">
            <h1 className="text-5xl text-center font-semibold">Your Goals</h1>
            <p className="mt-4 text-3xl text-center text-gray-200">View and add to your financial goals</p>
        </div>
      </div>
      {/* Rectangle 2 */}
      {/* <div className="bg-blue-800 text-center p-4 rounded-lg">
        <input
          type="text"
          placeholder="Enter text here"
          className="w-full p-2 rounded border border-gray-300"
          />
      </div> */}
  </div>

    );
};
  
export default Goal;
  