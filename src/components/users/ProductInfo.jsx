import React, { useState } from "react";
import {
  IoCartOutline, IoAdd, IoRemove, IoShieldCheckmarkOutline,
  IoLeafOutline, IoTimeOutline
} from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { showToast } from "../../utils/toast.js";
import "./styles/ProductInfo.css";
import { useNavigate } from "react-router";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(product.minOrderQty || 1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: qty });
    showToast(`${qty} ${product.unit} added to basket!`, "success");
  };

  if (!product) return null;

  return (
    <div className="info-blueprint">
      <header className="info-header">
        <div className="category-capsule">{product.category || "Premium Collection"}</div>
        <h1 className="product-title">{product.name}</h1>
        <div className="meta-row">
          <div className="rating-pill">★ 4.9 <span className="review-count">(120+ Reviews)</span></div>
          <span className="sku-tag">ID: {product._id.slice(-6).toUpperCase()}</span>
        </div>
      </header>

      <div className="pricing-architecture">
        <div className="price-stack">
          <span className="currency">Rs.</span>
          <span className="amount">{product.pricePerUnit?.toLocaleString()}</span>
          <span className="per-unit">/ {product.unit}</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="product-description-box">
        <h3 className="section-label">Description</h3>
        <p className="description-text">
          {product.description || "Premium quality product sourced and processed with the highest standards to ensure maximum nutritional value and freshness."}
        </p>
      </div>

      <div className="trust-row">
        <div className="trust-badge"><IoShieldCheckmarkOutline /> <span>Certified</span></div>
        <div className="trust-badge"><IoLeafOutline /> <span>Organic</span></div>
        <div className="trust-badge"><IoTimeOutline /> <span>Express</span></div>
      </div>

      <section className="checkout-blueprint">
  <div className="selection-card">
    <div className="qty-control-section">
      <span className="control-label">Quantity</span>
      <div className="modern-stepper">
        <button 
          className="step-btn" 
          onClick={() => setQty(Math.max(product.minOrderQty, qty - 1))}
          disabled={qty <= product.minOrderQty}
        >
          <IoRemove />
        </button>
        <div className="step-input">
          <span className="step-number">{qty}</span>
          <span className="step-unit">{product.unit}</span>
        </div>
        <button className="step-btn" onClick={() => setQty(qty + 1)}>
          <IoAdd />
        </button>
      </div>
    </div>

    <div className="price-summary-section">
      <span className="control-label">Total Price</span>
      <div className="total-price-display">
        Rs. {(product.pricePerUnit * qty).toLocaleString()}
      </div>
    </div>
  </div>

  <div className="button-group-vertical">
    <button className="btn-primary-add" onClick={handleAddToCart}>
      <IoCartOutline className="btn-icon" />
      <span>Add to Basket</span>
    </button>
    
    <div className="secondary-actions">
      <button className="btn-secondary-view" onClick={() => navigate("/cart")}>
        View Basket
      </button>
      <div className="min-order-pill">
        Min. Order: {product.minOrderQty} {product.unit}
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default ProductInfo;