import React from 'react';

const Categories = () => {
    return (
      <div className="fixed bottom-0 left-64 right-0 h-48 bg-gray-300 text-white flex flex-row p-4 shadow-lg">
        <button className="flex-1 py-3 mx-1 text-2xl bg-green-500 hover:bg-green-600 rounded">All</button>
        <button className="flex-1 py-3 mx-1 text-2xl bg-red-600 hover:bg-red-700 rounded">Needs</button>
        <button className="flex-1 py-3 mx-1 text-2xl bg-blue-600 hover:bg-blue-700 rounded">Wants</button>
        <button className="flex-1 py-3 mx-1 text-2xl bg-orange-600 hover:bg-orange-700 rounded">Savings</button>
      </div>
    );
  };
  
  export default Categories;
  