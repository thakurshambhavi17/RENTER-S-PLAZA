import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthForm.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            navigate('/');
        } catch (error) {
            console.error("Login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <h2>Welcome Back</h2>
                <p>Please enter your details to sign in.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input type="text" name="username" className="input-field" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" className="input-field" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn-primary w-100">Sign In</button>
                    <div className="auth-switch">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
