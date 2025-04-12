import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';
import Categories from './Categories.tsx';
import MainBudget from './MainBudget.tsx';

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('username') || 'there';

  // Redirect to start page if user doesn't enter name
  useEffect(() => {
    if (!localStorage.getItem('username')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 overflow-y-auto">
        {/* Header */}
        <div className="h-48 bg-gray-500 text-white shadow-lg py-8 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold">Hello {name}!</h1>
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
