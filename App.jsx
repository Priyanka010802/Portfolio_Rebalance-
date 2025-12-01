import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/PortfolioCrud';
import Simulation from './pages/Simulation';
import RiskAnalysis from './pages/RiskAnalysis';

// Initial portfolio JSON data example
const initialPortfolio = [
  { id: 1, name: 'Stocks', value: 6000, targetPercent: 0.6, volatility: 0.15 },
  { id: 2, name: 'Bonds', value: 3000, targetPercent: 0.3, volatility: 0.05 },
  { id: 3, name: 'Cash', value: 1000, targetPercent: 0.1, volatility: 0.01 },
];

function App() {
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard portfolio={portfolio} />} />
          <Route path="/portfolio" element={<Portfolio portfolio={portfolio} setPortfolio={setPortfolio} />} />
          <Route path="/simulation" element={<Simulation portfolio={portfolio} setPortfolio={setPortfolio} />} />
          <Route path="/risk" element={<RiskAnalysis portfolio={portfolio} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
