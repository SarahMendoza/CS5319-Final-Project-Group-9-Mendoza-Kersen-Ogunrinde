import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.tsx';

const Sheet = () => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [importance, setImportance] = useState('');
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = (cat = '', imp = '') => {
    let url = 'http://127.0.0.1:5000/expenses';
    const params = new URLSearchParams();
    if (cat) params.append('category', cat);
    if (imp) params.append('importance', imp);
    if (params.toString()) url += `?${params.toString()}`;
  
    fetch('http://127.0.0.1:5000/expenses', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Added to include session cookie
    })
      .then(res => res.json())
      .then(data => setExpenses(Array.isArray(data) ? data : []))
      .catch(err => console.error('Error fetching expenses:', err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = () => {
    fetch('http://127.0.0.1:5000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Added to include session cookie
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
          fetchExpenses();
        }
      })
      .catch(err => {
        console.error('Error adding expense:', err);
        alert('Failed to add expense');
      });
  };

  const deleteExpense = (expenseId: number) => {
    fetch(`http://127.0.0.1:5000/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          setExpenses(expenses.filter((exp) => exp.id !== expenseId));
        }
      })
      .catch((err) => {
        console.error('Error deleting expense:', err);
        alert('Failed to delete expense');
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

        <div className="flex gap-4 mb-6">
          <select
            className="p-2 border rounded"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              fetchExpenses(e.target.value, importance);
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
              fetchExpenses(category, e.target.value);
            }}
          >
            <option value="">All Importance Levels</option>
            <option value="need">Need</option>
            <option value="want">Want</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <h3 className="text-2xl font-semibold mb-4">Recent Expenses</h3>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-2 px-4">Item</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Importance</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenses) && expenses.length > 0 ? (
              expenses.map((exp, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{exp.item}</td>
                  <td className="py-2 px-4">${exp.amount}</td>
                  <td className="py-2 px-4">{exp.category}</td>
                  <td className="py-2 px-4 capitalize">{exp.importance}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No expenses added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sheet;
