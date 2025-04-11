import React from 'react';
import Sidebar from './Sidebar.tsx';
import Categories from './Categories.tsx';
import MainBudget from './MainBudget.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {

  const name = localStorage.getItem('username') || 'there';

  const navigate = useNavigate();

  //redirect to start page if user doesn't enter name
  useEffect(() => {
    if (!name) {
      navigate('/');
    }
  }, [name, navigate]);

  return (
    <div className="flex h-screen">
          <div>
            <Sidebar />
          </div>
        {/* Main content area */}
        <div className="flex-1 bg-gray-100">
          <div className="h-48 bg-gray-500 text-white shadow-lg py-8">
            <h1 className="text-5xl text-center font-semibold">Hello {name}!</h1>
            <p className="mt-4 text-3xl text-center text-gray-200">Here's your financial report for the month</p>
          </div>
            <div>
              <MainBudget />
            </div>
            {/* Optional bottom content */}
          </div>
        </div>
  );
};
  
  export default Home;