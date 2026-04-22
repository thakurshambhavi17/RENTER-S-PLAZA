import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
    const imageUrl = property.images && property.images.length > 0 
        ? property.images[0].image 
        : 'https://via.placeholder.com/400x300?text=No+Image';

    return (
        <div className="property-card glass-panel">
            <div className="card-image-wrap">
                <img src={imageUrl} alt={property.title} className="card-image" />
                <span className="card-price">${property.price}/mo</span>
            </div>
            <div className="card-content">
                <h3 className="card-title">{property.title}</h3>
                <p className="card-location"><i className="fas fa-map-marker-alt"></i> {property.location}</p>
                <div className="card-features">
                    <span><i className="fas fa-bed"></i> {property.bedrooms} Bed</span>
                    <span><i className="fas fa-bath"></i> {property.bathrooms} Bath</span>
                </div>
                <Link to={`/properties/${property.id}`} className="btn-secondary card-btn">View Details</Link>
            </div>
        </div>
    );
};

export default PropertyCard;
