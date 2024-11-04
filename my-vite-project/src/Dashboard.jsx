// src/components/Dashboard.js
import React from 'react';
import { getFromLocalStorage } from './LocalStorageHelper';
import './Dashboard.css';

const Dashboard = () => {
  const products = getFromLocalStorage('products') || [];

  return (
    <div className="dashboard">
      <h2>Dashboard - Current Stock Levels</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity in Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="no-products">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
