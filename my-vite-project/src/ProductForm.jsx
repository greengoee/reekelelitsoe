// src/components/ProductForm.js
import React, { useState } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from './LocalStorageHelper';
import './Productform.css'; 

const ProductForm = ({ onFormSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!product.name || !product.description || !product.category || !product.price || !product.quantity) {
      alert('Please fill in all fields.');
      return;
    }

    let products = getFromLocalStorage('products') || [];
    products.push(product);
    saveToLocalStorage('products', products);
    onFormSubmit();

    // Show success message
    setSuccessMessage('Product added successfully!');

    // Clear the form
    setProduct({ name: '', description: '', category: '', price: '', quantity: '' });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div>
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Initial Quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Success message */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ProductForm;
