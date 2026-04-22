import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

const OwnerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingsRes = await api.get('/bookings/');
                setBookings(bookingsRes.data.results || bookingsRes.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data");
            }
        };
        fetchData();
    }, []);

    const handleUpdateBooking = async (id, status) => {
        try {
            await api.patch(`/bookings/${id}/`, { status });
            setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        } catch (err) {
            console.error("Update failed");
        }
    };

    return (
        <div className="dashboard-container animation-fade">
            <h1 className="dashboard-header">Owner Dashboard</h1>
            <p>Welcome back, {user?.username}. Manage your property requests here.</p>
            
            <div className="dashboard-section glass-panel">
                <h2>Recent Booking Requests</h2>
                {bookings.length === 0 ? <p>No booking requests yet.</p> : (
                    <div style={{overflowX: 'auto'}}>
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Property ID</th>
                                    <th>Customer ID</th>
                                    <th>Dates</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(b => (
                                    <tr key={b.id}>
                                        <td>{b.property_details?.title || b.property}</td>
                                        <td>{b.user?.username || b.user}</td>
                                        <td>{b.check_in_date} to {b.check_out_date}</td>
                                        <td><span className={`status-badge ${b.status}`}>{b.status}</span></td>
                                        <td>
                                            {b.status === 'pending' && (
                                                <>
                                                    <button className="table-btn approve" onClick={() => handleUpdateBooking(b.id, 'confirmed')}>Approve</button>
                                                    <button className="table-btn reject" onClick={() => handleUpdateBooking(b.id, 'rejected')}>Reject</button>
                                                </>
                                            )}
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

export default OwnerDashboard;
