import './App.css';
import './index.js'
import Home from './components/Home.tsx';
import Sheet from './components/Sheet.tsx'
import Budget from './components/Budget.tsx'
import StartPage from './components/StartPage.tsx';
import SavingsGoalProgress from './components/SavingsGoalProgress.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage.tsx';

//test pushing to main
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/overview" element={<Home />} />
        <Route path="/sheet" element={<Sheet />} />
        <Route path="/savings-goal" element={<SavingsGoalProgress />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  );
}

export default App;
