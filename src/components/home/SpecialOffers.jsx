import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCubeOutline, IoFlameOutline, IoTrendingUp } from 'react-icons/io5';
import './styles/specialoffers.css';

const SpecialOffers = () => {
  const navigate = useNavigate();
  const offers = [
    {
      id: 1,
      title: 'Summer Sale',
      discount: '50% OFF',
      description: 'Select items on limited time',
      icon: <IoFlameOutline />
    },
    {
      id: 2,
      title: 'Bulk Orders',
      discount: '20% OFF',
      description: 'On orders over 10 items',
      icon: <IoCubeOutline />
    },
    {
      id: 3,
      title: 'Trending Now',
      discount: '15% OFF',
      description: 'Our most popular products',
      icon: <IoTrendingUp />
    }
  ];

  return (
    <section className="special-offers-section">
      <div className="container">
        <h2>Special Offers</h2>
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-icon">{offer.icon}</div>
              <h3>{offer.title}</h3>
              <div className="discount-badge">{offer.discount}</div>
              <p>{offer.description}</p>
              <button className="btn btn-small" onClick={() => navigate('/products')}>View More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
