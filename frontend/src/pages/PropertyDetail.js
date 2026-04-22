import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './PropertyDetail.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [bookingDates, setBookingDates] = useState({ check_in: '', check_out: '' });
    const [bookingStatus, setBookingStatus] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await api.get(`/properties/${id}/`);
                setProperty(res.data);
                if (res.data.images && res.data.images.length > 0) {
                    setMainImage(res.data.images[0].image);
                } else {
                    setMainImage('https://via.placeholder.com/800x400?text=No+Image');
                }
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await api.post('/bookings/', {
                property_id: property.id,
                check_in_date: bookingDates.check_in,
                check_out_date: bookingDates.check_out,
                status: 'pending'
            });
            setBookingStatus('Booking requested successfully! Waiting for owner approval.');
        } catch (err) {
            setBookingStatus('Failed to request booking. Please try again.');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="detail-container">
                <div className="skeleton-hero glass-panel"></div>
            </div>
        );
    }

    if (!property) return <div>Property not found</div>;

    const position = [51.505, -0.09]; // Default dummy location

    return (
        <div className="detail-container">
            <h1 className="detail-title">{property.title}</h1>
            <p className="detail-location"><i className="fas fa-map-marker-alt"></i> {property.location}</p>

            <div className="detail-grid">
                <div className="detail-left">
                    <div className="image-gallery glass-panel">
                        <div className="main-image-wrap">
                            <img src={mainImage} alt="Main" className="main-image" />
                        </div>
                        <div className="thumbnail-list">
                            {property.images && property.images.map((img) => (
                                <img 
                                    key={img.id} 
                                    src={img.image} 
                                    alt="Thumbnail" 
                                    className={`thumbnail ${mainImage === img.image ? 'active' : ''}`}
                                    onClick={() => setMainImage(img.image)} 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="detail-description glass-panel">
                        <h2>About this property</h2>
                        <p>{property.description}</p>
                        
                        <div className="features-grid">
                            <div className="feature-item">
                                <span className="label">Bedrooms:</span> {property.bedrooms}
                            </div>
                            <div className="feature-item">
                                <span className="label">Bathrooms:</span> {property.bathrooms}
                            </div>
                            <div className="feature-item">
                                <span className="label">Type:</span> {property.property_type}
                            </div>
                            <div className="feature-item">
                                <span className="label">Furnished:</span> {property.is_furnished ? 'Yes' : 'No'}
                            </div>
                        </div>
                    </div>

                    <div className="detail-map glass-panel">
                        <h2>Location</h2>
                        <div className="map-wrap">
                            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>{property.title} is located near here.</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>

                <div className="detail-right">
                    <div className="booking-card glass-panel">
                        <h3><span className="price-tag">${property.price}</span> <span className="per-month">/ month</span></h3>
                        
                        {bookingStatus && <div className="booking-status">{bookingStatus}</div>}

                        <form onSubmit={handleBooking} className="booking-form">
                            <div className="input-group">
                                <label>Check-in Date</label>
                                <input 
                                    type="date" 
                                    className="input-field" 
                                    required 
                                    value={bookingDates.check_in}
                                    onChange={(e) => setBookingDates({...bookingDates, check_in: e.target.value})}
                                />
                            </div>
                            <div className="input-group">
                                <label>Check-out Date</label>
                                <input 
                                    type="date" 
                                    className="input-field" 
                                    required 
                                    value={bookingDates.check_out}
                                    onChange={(e) => setBookingDates({...bookingDates, check_out: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="btn-primary w-100">Request to Book</button>
                        </form>
                        
                        <div className="owner-info">
                            <p>Listed by: <strong>{property.owner?.username || 'Owner'}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
