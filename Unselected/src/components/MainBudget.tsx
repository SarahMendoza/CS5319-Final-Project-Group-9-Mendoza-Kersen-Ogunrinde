import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MainBudget = () => {
  // state to store the budget summary
  const [summary, setSummary] = useState({
    budget: 0,
    total_spent: 0,
    remaining: 0,
    breakdown: {},
  });

  // fetch budget summary from backend when component mounts
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("No username found in localStorage");
      return;
    }

    const params = new URLSearchParams({ username });
    const url = `http://127.0.0.1:5000/summary?${params.toString()}`;

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Error fetching summary:", err));
  }, []);

  // transform breakdown object into array for the pie chart
  const data = Object.entries(summary?.breakdown || {}).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    // add budget summary
    <div className="w-full flex flex-col items-center">
      <div className="text-center my-6">
        <h2 className="text-2xl font-semibold">Budget Overview</h2>
        <p className="text-lg">Total Budget: ${summary.budget}</p>
        <p className="text-lg">Total Spent: ${summary.total_spent}</p>
        <p className="text-lg">Remaining: ${summary.remaining}</p>
      </div>

      {/* insert pie chart */}
      <div className="flex flex-col items-center my-8">
        <PieChart width={450} height={300}>
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

        {data.length === 0 && (
          <p className="text-gray-500 mt-4 text-center">
            No budget data yet. Add a budget and some expenses to see your
            breakdown.
          </p>
        )}

        {/* add pie chart legend */}
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
