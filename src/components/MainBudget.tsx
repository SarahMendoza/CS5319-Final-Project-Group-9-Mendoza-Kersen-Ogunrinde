import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import axios from 'axios';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MainBudget = () => {
  const [data, setData] = useState([
    { name: 'Test A', value: 100 },
    { name: 'Test B', value: 200 },
  ]);
  const [loading, setLoading] = useState(false);

    // Fetch different data based on button clicked
  const fetchData = async (endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/${endpoint}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

    return (
      <div>
        <div className="fixed bottom-0 left-64 right-0 h-48 bg-gray-300 text-white flex flex-row p-4 shadow-lg">
          <button className="flex-1 py-3 mx-1 text-2xl bg-green-500 hover:bg-green-600 rounded" onClick={() => fetchData('budget-summary')}>All</button>
          <button className="flex-1 py-3 mx-1 text-2xl bg-red-600 hover:bg-red-700 rounded" onClick={() => fetchData('setcost-summary')}>Needs</button>
          <button className="flex-1 py-3 mx-1 text-2xl bg-blue-600 hover:bg-blue-700 rounded" onClick={() => fetchData('expense-summary')}>Wants</button>
          <button className="flex-1 py-3 mx-1 text-2xl bg-orange-600 hover:bg-orange-700 rounded" onClick={() => fetchData('savings-summary')}>Savings</button>
        </div>
        <div className="w-full flex justify-center">
          <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={180}
            label
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        </div>
      </div>
    );
  };
  
  export default MainBudget;