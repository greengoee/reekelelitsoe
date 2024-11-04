// src/components/ProductList.js
import React, { useState } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from './LocalStorageHelper';
import './Productlist.css';

const ProductList = () => {
  const [products, setProducts] = useState(getFromLocalStorage('products') || []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [transactions, setTransactions] = useState(getFromLocalStorage('transactions') || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState(''); // State for success messages

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, idx) => idx !== index);
    saveToLocalStorage('products', updatedProducts);
    setProducts(updatedProducts);
    setMessage('Product deleted successfully!'); // Success message for delete
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const editProduct = (index) => {
    setCurrentProductIndex(index); // Store the index of the product being edited
    setCurrentProduct({ ...products[index] }); // Copy product details for editing
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProducts = [...products];

    // Update the current product details in the array
    updatedProducts[currentProductIndex] = currentProduct;

    // Save updates to local storage
    saveToLocalStorage('products', updatedProducts);
    setProducts(updatedProducts);
    setIsEditing(false);
    setCurrentProductIndex(null); // Reset the index
    setCurrentProduct({
      name: '',
      description: '',
      category: '',
      price: '',
      quantity: '',
    });
    setMessage('Product updated successfully!'); // Success message for update
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const addStock = (index) => {
    const quantityToAdd = parseInt(prompt('Enter quantity to add:'));
    if (!isNaN(quantityToAdd) && quantityToAdd > 0) {
      const updatedProducts = [...products];
      updatedProducts[index].quantity = parseInt(updatedProducts[index].quantity) + quantityToAdd;

      const newTransaction = {
        type: 'Add',
        product: updatedProducts[index].name,
        quantity: quantityToAdd,
        date: new Date().toLocaleString(),
      };
      const updatedTransactions = [...transactions, newTransaction];

      saveToLocalStorage('products', updatedProducts);
      saveToLocalStorage('transactions', updatedTransactions);
      setProducts(updatedProducts);
      setTransactions(updatedTransactions);
      setMessage('Stock added successfully!'); // Success message for adding stock
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } else {
      alert('Invalid quantity entered!');
    }
  };

  const deductStock = (index) => {
    const quantityToDeduct = parseInt(prompt('Enter quantity to deduct:'));
    if (!isNaN(quantityToDeduct) && quantityToDeduct > 0) {
      const updatedProducts = [...products];
      const newQuantity = updatedProducts[index].quantity - quantityToDeduct;

      if (newQuantity < 0) {
        alert('Stock cannot be negative!');
      } else {
        updatedProducts[index].quantity = newQuantity;

        const newTransaction = {
          type: 'Deduct',
          product: updatedProducts[index].name,
          quantity: quantityToDeduct,
          date: new Date().toLocaleString(),
        };
        const updatedTransactions = [...transactions, newTransaction];

        saveToLocalStorage('products', updatedProducts);
        saveToLocalStorage('transactions', updatedTransactions);
        setProducts(updatedProducts);
        setTransactions(updatedTransactions);
        setMessage('Stock deducted successfully!'); // Success message for deducting stock
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
      }
    } else {
      alert('Invalid quantity entered!');
    }
  };

  // Function to filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-list">
      <h2>Product List</h2>

      {message && <div className="success-message">{message}</div>} {/* Display success messages */}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Form for editing a product */}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={currentProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            required
          />
          <input
            type="text"
            name="description"
            value={currentProduct.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="category"
            value={currentProduct.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
          <input
            type="number"
            name="price"
            value={currentProduct.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="quantity"
            value={currentProduct.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
          />
          <button type="submit">Update Product</button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => addStock(index)}>Add Stock</button>
                  <button onClick={() => deductStock(index)}>Deduct Stock</button>
                  <button onClick={() => editProduct(index)}>Edit</button>
                  <button onClick={() => deleteProduct(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
     
      <div className="product-list">
        <h3>Transaction History</h3>
        <div className="transaction-history">
          <ul className="transaction-list">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <li
                  key={index}
                  className={`transaction-item ${transaction.type.toLowerCase()}-stock`}
                >
                  <div className="transaction-details">
                    <span className="transaction-type">
                      {transaction.type} {transaction.quantity} of {transaction.product}
                    </span>
                    <span className="transaction-date">{transaction.date}</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="transaction-item">
                <span>No transactions recorded.</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
