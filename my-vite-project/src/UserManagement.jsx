import React, { useState } from 'react';
import { saveToLocalStorage, getFromLocalStorage } from './LocalStorageHelper';
import './Usermanagement.css'; // Import the CSS file for styling

const UserManagement = () => {
  const [users, setUsers] = useState(getFromLocalStorage('users') || []);
  const [user, setUser] = useState({ name: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [message, setMessage] = useState(''); // State to hold success message

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const updatedUsers = [...users, user];
    saveToLocalStorage('users', updatedUsers);
    setUsers(updatedUsers);
    setUser({ name: '', password: '' });
    setMessage(''); // Clear any previous message
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, idx) => idx !== index);
    saveToLocalStorage('users', updatedUsers);
    setUsers(updatedUsers);
    setMessage('User deleted successfully'); // Set success message
  };

  const editUser = (index) => {
    setUser(users[index]);
    setIsEditing(true);
    setCurrentUserIndex(index);
    setMessage(''); // Clear any previous message
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUsers = [...users];
    updatedUsers[currentUserIndex] = user;
    saveToLocalStorage('users', updatedUsers);
    setUsers(updatedUsers);
    setUser({ name: '', password: '' });
    setIsEditing(false);
    setCurrentUserIndex(null);
    setMessage('User updated successfully'); // Set success message
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {message && <p className="success-message">{message}</p>} {/* Display success message */}

      <form onSubmit={isEditing ? handleUpdateUser : handleAddUser}>
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={user.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="User Password"
          value={user.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>

      <h3>Current Users</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} ({user.password ? '****' : 'No Password'}){' '}
            <button
              className="edit-button"
              onClick={() => editUser(index)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => deleteUser(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
