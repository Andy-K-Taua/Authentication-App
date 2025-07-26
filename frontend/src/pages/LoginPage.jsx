// frontend/src/pages/LoginPage.jsx

import React from 'react';
import Login from '../components/Login.jsx';

const LoginPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-10">Login Page</h1>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;