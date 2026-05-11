import React from 'react';

// CustomerTable component to display the list of customers
// Receives 'customers' data and 'onDelete' function as props
function CustomerTable({ customers, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Type</th>
            <th>Visits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer.id}>
                <td style={{ fontWeight: '600' }}>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.city}</td>
                <td>
                  <span className={`badge ${customer.gold_type === 'Silver' ? 'badge-silver' : 'badge-gold'}`}>
                    {customer.gold_type}
                  </span>
                </td>
                <td>{customer.visit_count}</td>
                <td>
                  <button 
                    className="btn-delete" 
                    onClick={() => onDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
