// src/components/Login.js
import React, { useState } from 'react';
import { getFromLocalStorage } from './LocalStorageHelper';
import './Login.css'; // Import the CSS file

function Login({ onLogin, goToSignUp }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for success message

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = getFromLocalStorage('users') || [];
    
    const user = users.find((user) => user.name === name && user.password === password);

    if (user) {
      setMessage('Login successful!'); // Set success message
      setTimeout(() => {
        onLogin(user); // Pass the logged-in user to the parent component after a short delay
        setMessage(''); // Clear the message
      }, 1000); // Delay of 1 second for the success message to show
    } else {
      alert('Invalid name or password. Please try again.');
    }
  };

  return (
    <div className="login"> {/* Apply login class for styling */}
      <h2>Login</h2>
      {message && <div className="success-message">{message}</div>} {/* Display success message */}
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Back to Sign In Page Button */}
      <button className="back-to-sign-up" onClick={goToSignUp}>
        Back to Sign In Page
      </button>
    </div>
  );
}

export default Login;
