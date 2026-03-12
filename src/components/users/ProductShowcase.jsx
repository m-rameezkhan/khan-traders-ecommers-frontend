import React, { useState } from "react";
import { IoChevronBackOutline, IoExpandOutline, IoCloseOutline } from "react-icons/io5";
import "./styles/ProductShowcase.css";

const ProductShowcase = ({ product, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    document.body.style.overflow = !isFullscreen ? "hidden" : "unset";
  };

  const getBadgeText = () => {
  const cat = product.category?.toLowerCase() || "";
  if (cat.includes("machinery") || cat.includes("equipment")) {
    return "Heavy Duty";
  }
  if (cat.includes("chemical")) {
    return "Industrial Grade";
  }
  return "Organic / Fresh"; // Default for fishmeal/feed
};

  const imgUrl = product.image || 'https://via.placeholder.com/600';

  return (
    <div className="visual-showcase">
      <button className="premium-back-btn" onClick={onBack}>
        <IoChevronBackOutline /> <span>Back to Shop</span>
      </button>

      {/* Main Display Stage */}
      <div className="image-stage" onClick={toggleFullscreen}>
        <div className="status-badge-container">
          <span className={`stock-badge ${product.stockQty > 0 ? 'in' : 'out'}`}>
            {product.stockQty > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="premium-badge">{getBadgeText()}</span>
        </div>

        <button className="expand-btn" title="View Fullscreen">
          <IoExpandOutline />
        </button>

        {/* The Image is now set to cover the entire container */}
        <img 
          src={imgUrl} 
          alt={product.name} 
          className="main-product-img-fill"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600'; }}
        />
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="image-lightbox" onClick={toggleFullscreen}>
          <button className="close-lightbox">
            <IoCloseOutline />
          </button>
          <img 
            src={imgUrl} 
            alt={product.name} 
            className="lightbox-img-simple"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;