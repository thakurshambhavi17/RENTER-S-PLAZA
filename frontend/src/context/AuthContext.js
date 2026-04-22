import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                // If it crashes, token is likely malformed
                const decoded = jwtDecode(token);
                // Here we would fetch full user details ideally from a /api/users/me/ endpoint
                setUser({ id: decoded.user_id, username: "User" });
            } catch (err) {
                console.error("Invalid token");
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const res = await api.post('/users/login/', { username, password });
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        const decoded = jwtDecode(res.data.access);
        setUser({ id: decoded.user_id, username });
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
