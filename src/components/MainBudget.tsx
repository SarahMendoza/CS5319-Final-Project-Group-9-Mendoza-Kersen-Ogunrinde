import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';


const data = [
    { name: 'Food', value: 400 },
    { name: 'Bills', value: 300 },
    { name: 'Transportation', value: 300 },
    { name: 'Entertainment', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MainBudget = () => {

    return (
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
    );
  };
  
  export default MainBudget;