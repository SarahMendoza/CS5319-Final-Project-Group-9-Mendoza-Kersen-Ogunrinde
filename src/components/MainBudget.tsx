import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import axios from 'axios';

<<<<<<< HEAD

=======
>>>>>>> 1044caa091bb09f0f6e143afe540e69e9d77ffc1
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

<<<<<<< HEAD
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
=======
  //state to store the budget summary 
  const [summary, setSummary] = useState({
    budget: 0,
    total_spent: 0,
    remaining: 0,
    breakdown: {}
  });

  // fetch budget summary from backend when component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/summary')
      .then(res => res.json())
      .then(data => {
        setSummary(data);
      })
      .catch(err => {
        console.error('Error fetching summary:', err);
      });
  }, []);
>>>>>>> 1044caa091bb09f0f6e143afe540e69e9d77ffc1
  

  //transform breakdown object into array for the pie chart
  const data = Object.entries(summary.breakdown).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* add budget summary */}
      <div className="text-center my-6">
        <h2 className="text-2xl font-semibold">Budget Overview</h2>
        <p className="text-lg">Total Budget: ${summary.budget}</p>
        <p className="text-lg">Total Spent: ${summary.total_spent}</p>
        <p className="text-lg">Remaining: ${summary.remaining}</p>
      </div>
  
      {/* insert pie chart */}
      <div className="flex flex-col items-center my-8">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            label
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>

        {/* add piechart legend */}
        <div className="mt-4 flex flex-wrap justify-center space-x-4 text-sm">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span>{entry.name}</span>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};
  
  export default MainBudget;
  