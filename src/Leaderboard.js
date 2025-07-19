import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newUser, setNewUser] = useState('');
  const [history, setHistory] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    const sortedUsers = res.data.sort((a, b) => b.totalPoints - a.totalPoints);
    setUsers(sortedUsers);
  };

  const fetchHistory = async () => {
    const res = await axios.get('http://localhost:5000/history');
    setHistory(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchHistory();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    await axios.post('http://localhost:5000/users', { name: newUser });
    setNewUser('');
    fetchUsers();
  };

  const handleClaimPoints = async () => {
    if (!selectedUser) return;
    await axios.post(`http://localhost:5000/claim/${selectedUser}`);
    fetchUsers();
    fetchHistory();
  };

  return (
    <div className="container">
      <h1>Leaderboard</h1>

      <div className="user-select">
        <select onChange={e => setSelectedUser(e.target.value)} value={selectedUser}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <button onClick={handleClaimPoints}>Claim Points</button>
      </div>

      <div className="add-user">
        <input
          type="text"
          placeholder="New User Name"
          value={newUser}
          onChange={e => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h2>Leaderboard</h2>
      <ul className="leaderboard">
        {users.map((user, index) => (
          <li key={user._id}>
            #{index + 1} {user.name} - {user.totalPoints} pts
          </li>
        ))}
      </ul>

      <h2>Claim History</h2>
      <ul className="history">
        {history.map(entry => (
          <li key={entry._id}>
            {entry.userName} earned {entry.pointsAwarded} pts on {new Date(entry.claimedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
