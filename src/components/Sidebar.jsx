import React from 'react';

// Sidebar component for navigation
// This is a simple functional component that renders the left-side menu
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        ✨ JewelCRM
      </div>
      
      <ul className="nav-links">
        <li className="nav-item active">
          📊 Dashboard
        </li>
        <li className="nav-item">
          👥 Customers
        </li>
        <li className="nav-item">
          💰 Sales
        </li>
        <li className="nav-item">
          💎 Inventory
        </li>
        <li className="nav-item">
          ⚙️ Settings
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
