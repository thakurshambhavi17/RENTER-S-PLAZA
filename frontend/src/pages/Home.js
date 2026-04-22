import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PropertyCard from '../components/PropertyCard';
import './Home.css';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await api.get('/properties/');
                setProperties(res.data.results || res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    return (
        <div className="home-container">
            <header className="hero-section glass-panel">
                <h1>Find Your Next Perfect Home</h1>
                <p>Discover apartments, villas, and more.</p>
                <div className="search-bar">
                    <input type="text" className="input-field" placeholder="Search by city, area, or zip code..." />
                    <button className="btn-primary">Search</button>
                </div>
            </header>

            <section className="property-grid-section">
                <h2>Featured Properties</h2>
                <div className="property-grid">
                    {loading ? (
                        Array.from({length: 6}).map((_, i) => <div key={i} className="skeleton-card glass-panel"></div>)
                    ) : (
                        properties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
