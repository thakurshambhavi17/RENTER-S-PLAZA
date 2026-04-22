import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

const CustomerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsRes = await api.get('/bookings/');
                setBookings(bookingsRes.data.results || bookingsRes.data);
            } catch (err) {
                console.error("Failed to fetch customer data");
            }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-container animation-fade">
            <h1 className="dashboard-header">Customer Dashboard</h1>
            <p>Welcome back, {user?.username}. Here are your recent activity.</p>
            
            <div className="dashboard-section glass-panel">
                <h2>My Bookings</h2>
                {bookings.length === 0 ? <p>You haven't requested any properties yet.</p> : (
                    <div style={{overflowX: 'auto'}}>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Status</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(b => (
                                    <tr key={b.id}>
                                        <td>{b.property_details?.title || 'Property ID: '+b.property}</td>
                                        <td>{b.check_in_date}</td>
                                        <td>{b.check_out_date}</td>
                                        <td><span className={`status-badge ${b.status}`}>{b.status}</span></td>
                                        <td>
                                            <Link to={`/properties/${b.property}`} className="btn-secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.8rem'}}>View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerDashboard;
