import React, { useState, useEffect } from 'react';
import './App.css';

// Import our custom components
import Sidebar from './components/Sidebar';
import DashboardCards from './components/DashboardCards';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';

// Import our API functions
import { fetchCustomers, addCustomer, deleteCustomer } from './api/customers';

function App() {
  // 1. STATE MANAGEMENT
  // We keep the main list of customers here in the parent component
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. EFFECT HOOK
  // This runs once when the app starts to load initial data
  useEffect(() => {
    loadCustomers();
  }, []);

  // 3. FUNCTIONS FOR API CALLS

  // Function to get customers from backend
  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load customers. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new customer
  const handleAddCustomer = async (newCustomer) => {
    try {
      await addCustomer(newCustomer);
      // Auto-refresh the list after adding
      loadCustomers();
    } catch (err) {
      alert('Error adding customer');
    }
  };

  // Function to delete a customer
  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        // Auto-refresh the list after deleting
        loadCustomers();
      } catch (err) {
        alert('Error deleting customer');
      }
    }
  };

  // 4. UI RENDERING
  return (
    <div className="app-container">
      {/* Sidebar - Static Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <h1>Customer Management Dashboard</h1>
          <p style={{ color: '#64748b' }}>Manage your jewellery store customers and sales efficiently.</p>
        </header>

        {/* Dashboard Stat Cards */}
        <DashboardCards totalCustomers={customers.length} />

        {/* Error Message if any */}
        {error && <div className="error">{error}</div>}

        {/* Add Customer Form */}
        <CustomerForm onAdd={handleAddCustomer} />

        {/* Loading State */}
        {loading ? (
          <div className="loading">Loading customers...</div>
        ) : (
          /* Customer Table */
          <CustomerTable
            customers={customers}
            onDelete={handleDeleteCustomer}
          />
        )}
      </main>


     

    </div>
  );
}

export default App;
