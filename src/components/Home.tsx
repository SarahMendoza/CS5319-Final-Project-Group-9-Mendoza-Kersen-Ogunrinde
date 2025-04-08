import React from 'react';
import Sidebar from './Sidebar.tsx';
import Categories from './Categories.tsx';
import MainBudget from './MainBudget.tsx';

const Home = () => {

    var username = "Tom";

    return (
      <div className="flex h-screen">
            <div>
              <Sidebar />
            </div>
          {/* Main content area */}
          <div className="flex-1 bg-gray-100">
            <div className="h-48 bg-gray-500 text-white shadow-lg py-8">
              <h1 className="text-5xl text-center font-semibold">Hello {username}!</h1>
              <p className="mt-4 text-3xl text-center text-gray-200">Here's your financial report for the month</p>
            </div>
              <div>
                <Categories />
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