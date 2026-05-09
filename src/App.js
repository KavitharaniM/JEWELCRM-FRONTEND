import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  // ============================
  // FORM STATES
  // ============================

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [goldType, setGoldType] = useState('');

  // ============================
  // CUSTOMER DATA
  // ============================

  const [customers, setCustomers] = useState([]);

  // ============================
  // FETCH CUSTOMERS
  // ============================

  const fetchCustomers = () => {

    axios.get('http://localhost:5000/customers')

      .then((res) => {

        setCustomers(res.data);

      })

      .catch((err) => {

        console.log("FETCH ERROR:", err);

      });

  };

  // ============================
  // LOAD DATA
  // ============================

  useEffect(() => {

    fetchCustomers();

  }, []);

  // ============================
  // ADD CUSTOMER
  // ============================

  const addCustomer = () => {

    // VALIDATION

    if (!name || !phone || !city || !goldType) {

      alert("Please fill all fields");

      return;

    }

    axios.post(

      'http://localhost:5000/customers',

      {
        name: name,
        phone: phone,
        city: city,
        gold_type: goldType
      }

    )

    .then((res) => {

      console.log("INSERT SUCCESS:", res.data);

      // REFRESH TABLE
      fetchCustomers();

      // CLEAR INPUTS
      setName('');
      setPhone('');
      setCity('');
      setGoldType('');

    })

    .catch((err) => {

      console.log("INSERT ERROR:", err);

    });

  };

  // ============================
  // DELETE CUSTOMER
  // ============================

  const deleteCustomer = (id) => {

    axios.delete(`http://localhost:5000/customers/${id}`)

      .then((res) => {

        console.log("DELETE SUCCESS:", res.data);

        fetchCustomers();

      })

      .catch((err) => {

        console.log("DELETE ERROR:", err);

      });

  };

  // ============================
  // MOST INTERESTED GOLD TYPE
  // ============================

  const getMostInterestedGoldType = () => {

    if (customers.length === 0) {

      return 'No Data';

    }

    // COUNT GOLD TYPES

    const counts = customers.reduce((acc, customer) => {

      // NORMALIZE DATA
      const type =
        customer.gold_type
          .trim()
          .toLowerCase();

      acc[type] =
        (acc[type] || 0) + 1;

      return acc;

    }, {});

    // FIND MAX COUNT

    const maxCount =
      Math.max(...Object.values(counts));

    // GET ALL TYPES WITH SAME MAX COUNT

    const mostInterested = Object.keys(counts)

      .filter(
        type => counts[type] === maxCount
      );

    return mostInterested.join(', ');

  };

  // ============================
  // JSX UI
  // ============================

  return (

    <div className="main-container">

      {/* ============================
          SIDEBAR
      ============================ */}

      <div className="sidebar">

        <h2>💎 Jewel CRM</h2>

        <ul>

          <li>Dashboard</li>

          <li>Customers</li>

          <li className="disabled">
            Orders (Coming Soon)
          </li>

          <li className="disabled">
            Sales (Coming Soon)
          </li>

          <li className="disabled">
            Reports (Coming Soon)
          </li>

        </ul>

      </div>

      {/* ============================
          MAIN CONTENT
      ============================ */}

      <div className="content">

        <h1>Jewellery CRM Dashboard</h1>

        {/* ============================
            DASHBOARD CARDS
        ============================ */}

        <div className="dashboard-cards">

          {/* TOTAL CUSTOMERS */}

          <div className="card">

            <h3>Total Customers</h3>

            <p>{customers.length}</p>

          </div>

          {/* TOTAL VISITS */}

          <div className="card">

            <h3>Total Visits</h3>

            <p>

              {

                customers.reduce(

                  (total, customer) =>

                    total + (customer.visit_count || 0),

                  0

                )

              }

            </p>

          </div>

          {/* MOST INTERESTED GOLD TYPE */}

          <div className="card">

            <h3>Most Interested Gold Type</h3>

            <p>

              {getMostInterestedGoldType()}

            </p>

          </div>

        </div>

        {/* ============================
            FORM SECTION
        ============================ */}

        <div className="form-section">

          <h2>Add Customer</h2>

          <div className="form-grid">

            {/* NAME */}

            <input
              type="text"
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* PHONE */}

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* CITY */}

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            {/* GOLD TYPE */}

            <input
              type="text"
              placeholder="Gold Type"
              value={goldType}
              onChange={(e) => setGoldType(e.target.value)}
            />

          </div>

          {/* BUTTON */}

          <button
            className="add-btn"
            onClick={addCustomer}
          >
            Add Customer
          </button>

        </div>

        {/* ============================
            CUSTOMER TABLE
        ============================ */}

        <div className="table-section">

          <h2>Customer List</h2>

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Gold Type</th>
                <th>Visit Count</th>
                <th>Created At</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {

                customers.map((customer) => (

                  <tr key={customer.id}>

                    <td>{customer.id}</td>

                    <td>{customer.name}</td>

                    <td>{customer.phone}</td>

                    <td>{customer.city}</td>

                    <td>{customer.gold_type}</td>

                    <td>{customer.visit_count}</td>

                    <td>

                      {

                        customer.created_at

                        ? new Date(
                            customer.created_at
                          ).toLocaleDateString()

                        : ''

                      }

                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default App;