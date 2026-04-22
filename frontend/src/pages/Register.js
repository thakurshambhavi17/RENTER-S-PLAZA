import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './AuthForm.css';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'customer' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users/register/', formData);
            navigate('/login');
        } catch (error) {
            console.error("Registration failed:", error.response?.data);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <h2>Create an Account</h2>
                <p>Join Renters Plaza today.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" name="username" className="input-field" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" className="input-field" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" className="input-field" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>I am a</label>
                        <select name="role" className="input-field" onChange={handleChange}>
                            <option value="customer">Looking to rent (Customer)</option>
                            <option value="owner">Property Owner</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary w-100">Sign Up</button>
                    <div className="auth-switch">
                        Already have an account? <Link to="/login">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
