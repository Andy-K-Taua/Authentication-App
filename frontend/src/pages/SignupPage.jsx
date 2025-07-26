// frontend/src/pages/SignupPage.jsx

import React from 'react';
import Signup from '../components/Signup';
import { Link } from 'react-router-dom';

const SignupPage = () => {
    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
            <h1 className="text-3xl font-bold mb-10">Signup Page</h1>
            <Signup />
            <p className="mt-4">Already a user? <Link to="/login" className="link link-primary">Login</Link></p>
        </div>
    );
};

export default SignupPage;