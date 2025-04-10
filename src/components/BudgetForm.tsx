import React, { useState } from 'react';
import axios from "axios";

const CATEGORIES = ['Housing', 'Food', 'Utilities', 'Transportation', 'Entertainment', 'Other'];

const BudgetForm = () => {
  const [expenses, setExpenses] = useState([['', '', '']]);
  const MAX_EXPENSES = 10;

  const handleChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  const addExpenseField = () => {
    if (expenses.length < MAX_EXPENSES) {
      setExpenses([...expenses, ['', '', '']]);
    }
  };
  const handleSpending = async () => {
    const formatted = expenses.map(([label, amount, category]) => ({
      label,
      amount: parseFloat(amount),
      category,
    }));

    await axios.post('http://localhost:5000/api/expenses', { expenses: formatted });
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold text-gray-600 mb-6">Add daily expense</h2>

      <div className="max-h-80 overflow-y-auto">
        {expenses.map(([label, amount, category], index) => (
          <div key={index} className="flex justify-center items-center gap-4 mb-4">
            <input
              type="text"
              value={label}
              onChange={(e) => handleChange(index, 0, e.target.value)}
              placeholder="Label (e.g. Rent)"
              className="w-40 p-2 rounded border border-gray-300"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => handleChange(index, 1, e.target.value)}
              placeholder="Amount"
              className="w-32 p-2 rounded border border-gray-300"
            />
            <select
              value={category}
              onChange={(e) => handleChange(index, 2, e.target.value)}
              className="w-40 p-2 rounded border border-gray-300 bg-white"
            >
              <option value="" disabled>Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        onClick={addExpenseField}
        disabled={expenses.length >= MAX_EXPENSES}
        className={`mt-4 px-4 py-2 rounded ${
          expenses.length >= MAX_EXPENSES ? 'bg-gray-400' : 'bg-blue-500 text-white'
        }`}
      >
        + Add Expense
      </button>
      <div className="flex flex-col items-center">
      <button className="bg-green-700 hover:bg-green-600 text-white mt-20 font-medium py-3 px-5 rounded text-center" onClick={handleSpending}>
        Submit expenses
        </button>
      </div>
    </div>
  );
};

export default BudgetForm;