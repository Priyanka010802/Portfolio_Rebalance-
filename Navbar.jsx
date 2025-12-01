import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">PortfolioApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><NavLink to="/" className="nav-link" end>Dashboard</NavLink></li>
            <li className="nav-item"><NavLink to="/portfolio" className="nav-link">Portfolio</NavLink></li>
            <li className="nav-item"><NavLink to="/simulation" className="nav-link">Simulation</NavLink></li>
            <li className="nav-item"><NavLink to="/risk" className="nav-link">Risk Analysis</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
