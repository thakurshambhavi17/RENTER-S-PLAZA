import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar glass-panel">
            <div className="navbar-brand">
                <Link to="/">
                    <h2>Renters<span>Plaza</span></h2>
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                {user ? (
                    <>
                        <Link to={user.role === 'owner' ? '/dashboard/owner' : '/dashboard/customer'} className="nav-link">Dashboard</Link>
                        <span className="welcome-text">Hi, {user.username}</span>
                        <button onClick={logout} className="btn-secondary">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="btn-primary">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
