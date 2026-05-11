import React from 'react';

// DashboardCards component to show summary stats
// Receives 'totalCustomers' as a prop from App.jsx
function DashboardCards({ totalCustomers }) {
  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <p className="stat-label">Total Customers</p>
        <h2 className="stat-value">{totalCustomers}</h2>
      </div>
      
      <div className="stat-card">
        <p className="stat-label">Total Sales</p>
        <h2 className="stat-value">₹ 4,50,000</h2>
      </div>
      
      <div className="stat-card">
        <p className="stat-label">Gold Price (24k)</p>
        <h2 className="stat-value">₹ 7,200</h2>
      </div>
      
      <div className="stat-card">
        <p className="stat-label">New Visits Today</p>
        <h2 className="stat-value">12</h2>
      </div>
    </div>
  );
}

export default DashboardCards;
