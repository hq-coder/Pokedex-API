import React, { useState } from 'react';
import './signin.css';
import pikachuRun from "../images/pikachuRun.gif";
import rollingPoke from "../images/rollingPoke.gif";
import { TbPokeball } from 'react-icons/tb';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log(`Logging in with username: ${username} and password: ${password}`);
  };

  return (
    <div className='login-container'>
      <div className="login-box">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
      </div>
      
      <div className="login-images">
        <img src={pikachuRun} className="pikachu-image" alt="Pikachu running" />
        <img src={rollingPoke} className="rolling-pokeball" alt="Rolling Pokeball" />
      </div>
    </div>
  );
}

export default Login;
