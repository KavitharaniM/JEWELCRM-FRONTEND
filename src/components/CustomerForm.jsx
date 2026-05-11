import React, { useState } from 'react';

// CustomerForm component to handle adding new customers
// Receives 'onAdd' function as a prop to notify App.jsx when a new customer is added
function CustomerForm({ onAdd }) {
  // Local state for form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [goldType, setGoldType] = useState('22K');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create customer object
    const newCustomer = {
      name: name,
      phone: phone,
      city: city,
      gold_type: goldType
    };

    // Call the parent function to handle the API call // backend
    onAdd(newCustomer);

    // Clear form after submission
    setName('');
    setPhone('');
    setCity('');
  };

  return (
    <div className="form-container">
      <h3>Add New Customer</h3>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Enter name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="text" 
              placeholder="Enter phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>City</label>
            <input 
              type="text" 
              placeholder="Enter city" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
            />
          </div>
          
          <div className="form-group">
            <label>Preference</label>
            <select value={goldType} onChange={(e) => setGoldType(e.target.value)}>
              <option value="22K">22K Gold</option>
              <option value="24K">24K Gold</option>
              <option value="Silver">Silver</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn-submit">
          Add Customer
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;
