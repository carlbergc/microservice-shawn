import React, { useState } from 'react';

/*Handles user authentication via email/password credentials*/
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /*Handles form submission and authentication*/
  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      // API request to authentication endpoint
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      // Process API response
      const data = await response.json();
      if (data.success) {
        alert('Login successful!');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

    // Input credentials
  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', margin: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', margin: 10 }}
        />
        <button type="submit" style={{ margin: 10 }}>
          Login
        </button>
      </form>
    </div>
  );
}
