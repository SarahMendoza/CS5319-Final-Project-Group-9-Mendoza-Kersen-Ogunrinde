import React, { useState } from 'react';

var MAX_EXPENSES = 7

const ExpenseForm = () => {
  const [expenses, setExpenses] = useState([['', '']]);

  const handleChange = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  const addExpenseField = () => {
    setExpenses([...expenses, ['', '']]);
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold text-gray-600 mb-6">2: Add fixed expenses</h2>

      {expenses.map(([label, amount], index) => (
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
            className="w-40 p-2 rounded border border-gray-300"
          />
        </div>
      ))}

      <button
        onClick={addExpenseField}
        disabled={expenses.length >= MAX_EXPENSES}
        className={`mt-4 px-4 py-2 rounded ${
          expenses.length >= MAX_EXPENSES ? 'bg-gray-400' : 'bg-blue-500 text-white'
        }`}
      >
        + Add Expense
      </button>
    </div>
  );
};

export default ExpenseForm;