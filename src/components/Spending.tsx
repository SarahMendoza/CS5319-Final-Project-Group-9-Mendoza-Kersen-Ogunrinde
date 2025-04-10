import React from 'react';
import Sidebar from './Sidebar.tsx';
import BudgetForm from './BudgetForm.tsx';

const Spending = () => {

    return (
      <div className="flex h-screen">
            <div>
              <Sidebar />
            </div>
          {/* Main content area */}
          <div className="flex flex-col flex-1 bg-gray-100">
            <div className="h-48 bg-gray-500 text-white shadow-lg py-8">
                <h1 className="text-5xl text-center font-semibold">Input Daily Spending</h1>
                <p className="mt-4 text-3xl text-center text-gray-200">
                    Track your daily spending to update your budget
                </p>
            </div>
            <div className="flex flex-col items-center justify-start flex-1 gap-12 py-12">
                <BudgetForm />
            </div>
        </div>
    </div>
    );
  };
  
  export default Spending;