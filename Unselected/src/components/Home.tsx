import React from 'react';
import Sidebar from './Sidebar.tsx';
import Categories from './Categories.tsx';
import MainBudget from './MainBudget.tsx';

const Home = () => {
  // Retrieve the username from localStorage
  const name = localStorage.getItem('username') || 'Guest';

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        {/* Header */}
        <div className="h-48 bg-gray-500 text-white shadow-lg py-8 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold">Hello, {name}!</h1>
          <p className="mt-4 text-3xl text-gray-200">
            Here's your financial report for the month
          </p>
        </div>

        {/* Main Budget Component */}
        <div className="p-6">
          <MainBudget />
        </div>
      </div>
    </div>
  );
};

export default Home;
