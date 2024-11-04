// src/components/SignIn.js
import React, { useState } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from './LocalStorageHelper';
import './Signin.css';

const SignIn = ({ onSignIn }) => {
  const [user, setUser] = useState({ name: '', password: '' });
  const [message, setMessage] = useState(''); // State for success message

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getFromLocalStorage('users') || [];

    // Check if a user with the same name already exists
    const userExists = users.find(existingUser => existingUser.name === user.name);
    if (userExists) {
      alert("User with this name already exists. Please choose another name.");
      return;
    }

    // Check if all fields are filled (though 'required' attribute already ensures this)
    if (!user.name || !user.password) {
      alert('Please fill all fields.');
      return;
    }

    users.push(user); // Save the new user with name and password
    saveToLocalStorage('users', users);
    setMessage('Sign up successful!'); // Set success message

    setTimeout(() => {
      onSignIn(user); // Trigger sign-in after showing the message
      setMessage(''); // Clear the message
    }, 1000); // Delay of 1 second
  };

  return (
    <div className="sign-in">
      <h2>Sign Up</h2>
      {message && <div className="success-message">{message}</div>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignIn;
