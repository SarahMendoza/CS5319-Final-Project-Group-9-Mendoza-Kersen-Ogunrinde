import './App.css';
import './index.js'
import Home from './components/Home.tsx';
import Goal from './components/Goal.tsx';
import Sheet from './components/Sheet.tsx'
import Budget from './components/Budget.tsx'
import Spending from './components/Spending.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';

//test pushing to main
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/sheet" element={<Sheet />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/spending" element={<Spending />} />
      </Routes>
    </Router>
  );
}

export default App;
