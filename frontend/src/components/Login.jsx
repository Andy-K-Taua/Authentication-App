// frontend/src/components/Login.jsx

import React, { useState } from 'react';
import { loginUser } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [token, setToken] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(username, password);
      setToken(data.token);
      setShowVerification(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const data = await verifyUser(token, verificationCode);
      console.log(data);
      navigate('/logout'); 
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyUser = async (token, verificationCode) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, verificationCode }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      {showVerification ? (
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Verification Code:</span>
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
              className="input input-bordered"
            />
          </div>
          <button type="submit" className="btn btn-primary">Verify</button>
          {error && <p className="text-error">{error}</p>}
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username:</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input input-bordered"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-8">Login</button>
          {error && <p className="text-error">{error}</p>}
        </form>
      )}
    </>
  );
};

export default Login;