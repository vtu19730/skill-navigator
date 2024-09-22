import React, { useState } from 'react';
import authService from '../services/authService';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.signup({ email, password });
            if (response.data.message === 'User created successfully') {
                window.location.href = '/login'; // Redirect to login page
            }
        } catch (error) {
            setError('Signup failed. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Signup;
