import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./styles/productCard.css";
import { showToast } from "../../utils/toast.js";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

    const navigate = useNavigate();
    const { addToCart } = useCart();
    // Initialize quantity at minimum order amount
    const [qty, setQty] = useState(product.minOrderQty);

    const increment = () => setQty(prev => prev + 1);
    const decrement = () => {
        if (qty > product.minOrderQty) {
            setQty(prev => prev - 1);
        } else {
            showToast(`Minimum order is ${product.minOrderQty}`, "info");
        }
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: qty,
        });
        showToast(`${qty} ${product.unit} of ${product.name} added!`, "success");
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }} />
                <span className="category-tag">Fresh</span>
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">
                    Rs {product.pricePerUnit} <span className="unit">/ {product.unit}</span>
                </p>
                <p className="min-order">
                    Min: {product.minOrderQty} {product.unit}
                </p>
            </div>

            {/* Professional Quantity Selector */}
            <div className="qty-selector">
                <button onClick={decrement} className="qty-btn" disabled={qty <= product.minOrderQty}>
                    <i className="fa-solid fa-minus"></i>
                </button>
                <span className="qty-display">{qty} <small>{product.unit}</small></span>
                <button onClick={increment} className="qty-btn">
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

            {/* Professional Action Buttons */}
            <div className="card-actions">
                <button className="view-details-btn" onClick={() => navigate(`/product/${product._id}`)}>
                    <i className="fa-solid fa-circle-info"></i> View Details
                </button>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;