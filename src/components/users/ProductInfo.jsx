import React, { useState } from "react";
import {
  IoCartOutline, IoAdd, IoRemove, IoShieldCheckmarkOutline,
  IoLeafOutline, IoTimeOutline, IoAlertCircleOutline
} from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { showToast } from "../../utils/toast.js";
import "./styles/ProductInfo.css";
import { useNavigate } from "react-router";

const ProductInfo = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Initialize qty at min order amount
  const [qty, setQty] = useState(product.minOrderQty || 1);

  if (!product) return null;

  const isOutOfStock = product.stockQty <= 0;

  // --- LOGIC: Bound Quantity between Min and Stock ---
  const handleIncrement = () => {
    if (qty < product.stockQty) {
      setQty((prev) => prev + 1);
    } else {
      showToast(`Only ${product.stockQty.toLocaleString()} ${product.unit} available in stock`, "warning");
    }
  };

  const handleDecrement = () => {
    if (qty > product.minOrderQty) {
      setQty((prev) => prev - 1);
    } else {
      showToast(`Minimum order requirement is ${product.minOrderQty}`, "info");
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) {
      showToast("Sorry, this item is currently out of stock", "error");
      return;
    }
    addToCart({ ...product, quantity: qty });
    showToast(`${qty.toLocaleString()} ${product.unit} of ${product.name} added to basket!`, "success");
  };

  return (
    <div className={`info-blueprint ${isOutOfStock ? "out-of-stock-mode" : ""}`}>
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
          <span className="amount">{product.pricePerUnit?.toLocaleString('en-US')}</span>
          <span className="per-unit">/ {product.unit}</span>
        </div>
        
        {/* NEW: Stock Status Display */}
        <div className={`stock-status-display ${product.stockQty < 10 ? 'low-stock-alert' : ''}`}>
          {isOutOfStock ? (
            <span className="status-label out"><IoAlertCircleOutline /> Out of Stock</span>
          ) : (
            <span className="status-label in">Available Stock: {product.stockQty.toLocaleString('en-US')} {product.unit}</span>
          )}
        </div>
      </div>

      <div className="product-description-box">
        <h3 className="section-label">Description</h3>
        <p className="description-text">
          {product.description || "Premium quality product sourced and processed with the highest standards."}
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
                onClick={handleDecrement}
                disabled={qty <= product.minOrderQty || isOutOfStock}
              >
                <IoRemove />
              </button>
              <div className="step-input">
                <span className="step-number">{qty.toLocaleString()}</span>
                <span className="step-unit">{product.unit}</span>
              </div>
              <button 
                className="step-btn" 
                onClick={handleIncrement}
                disabled={qty >= product.stockQty || isOutOfStock}
              >
                <IoAdd />
              </button>
            </div>
          </div>

          <div className="price-summary-section">
            <span className="control-label">Total Price</span>
            <div className="total-price-display">
              Rs. {(product.pricePerUnit * qty).toLocaleString('en-US')}
            </div>
          </div>
        </div>

        <div className="button-group-vertical">
          <button 
            className="btn-primary-add" 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <IoCartOutline className="btn-icon" />
            <span>{isOutOfStock ? "Out of Stock" : "Add to Basket"}</span>
          </button>
          
          <div className="secondary-actions">
            <button className="btn-secondary-view" onClick={() => navigate("/cart")}>
              View Basket
            </button>
            <div className="min-order-pill">
              Min. Order: {product.minOrderQty.toLocaleString()} {product.unit}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductInfo;