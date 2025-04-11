import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.tsx';

//this is for the "Input Spending" sidebar tab
const Sheet = () => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [importance, setImportance] = useState('');
  const [expenses, setExpenses] = useState([]);

  // used to fetch expenses from backend
  const fetchExpenses = (cat = '', imp = '') => {
    let url = 'http://127.0.0.1:5000/expenses';
    const params = new URLSearchParams();
    if (cat) params.append('category', cat);
    if (imp) params.append('importance', imp);
    if (params.toString()) url += `?${params.toString()}`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error('Error fetching expenses:', err));
  };

  // used to fetch once when component loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  // used to submit new expense
  const handleSubmit = () => {
    fetch('http://127.0.0.1:5000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item,
        amount: parseFloat(amount),
        category,
        importance
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(`Failure! ${data.error}`);
        } else {
          alert('Success! Expense added!');
          setItem('');
          setAmount('');
          setCategory('');
          setImportance('');
          fetchExpenses(); // Refresh expense list
        }
      })
      .catch(err => {
        console.error('Error adding expense:', err);
        alert('Failed to add expense');
      });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Add New Expense</h2>

        <div className="space-y-4 max-w-md mb-10">
          <input
            className="w-full p-2 border rounded"
            placeholder="Item (e.g. Coffee)"
            value={item}
            onChange={e => setItem(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Category (e.g. Food)"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={importance}
            onChange={e => setImportance(e.target.value)}
          >
            <option value="">Select Importance</option>
            <option value="need">Need</option>
            <option value="want">Want</option>
            <option value="luxury">Luxury</option>
          </select>

          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Add Expense
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex gap-4 mb-6">
          <select
            className="p-2 border rounded"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              fetchExpenses(e.target.value, importance); // re-fetch with new filter
            }}
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Housing">Housing</option>
          </select>

          <select
            className="p-2 border rounded"
            value={importance}
            onChange={(e) => {
              setImportance(e.target.value);
              fetchExpenses(category, e.target.value); // re-fetch with new filter
            }}
          >
            <option value="">All Importance Levels</option>
            <option value="need">Need</option>
            <option value="want">Want</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        {/* Kirk -- add expense table */}
        <h3 className="text-2xl font-semibold mb-4">Recent Expenses</h3>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Importance</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{exp.item}</td>
                <td className="py-2 px-4">${exp.amount}</td>
                <td className="py-2 px-4">{exp.category}</td>
                <td className="py-2 px-4 capitalize">{exp.importance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sheet;
