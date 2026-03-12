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

    // --- UTILITY: EN-US Comma Formatting ---
    const formatValue = (num) => {
        return num ? num.toLocaleString('en-US') : "0";
    };

    const label = (() => {
        const category = product.category?.toLowerCase() || "";
        if (category.includes("machinery") || category.includes("equipment")) return { text: "Heavy Duty", class: "machinery" };
        if (category.includes("chemical") || category.includes("raw material")) return { text: "Premium Grade", class: "premium" };
        if (category.includes("gadget") || category.includes("electronic")) return { text: "High Tech", class: "tech" };
        return { text: "Fresh", class: "fresh" };
    })();

    // --- LOGIC: Bound Quantity between Min and Stock ---
    const increment = () => {
        if (qty < product.stockQty) {
            setQty(prev => prev + 1);
        } else {
            showToast(`Only ${formatValue(product.stockQty)} ${product.unit} available in stock`, "warning");
        }
    };

    const decrement = () => {
        if (qty > product.minOrderQty) {
            setQty(prev => prev - 1);
        } else {
            showToast(`Minimum order is ${formatValue(product.minOrderQty)}`, "info");
        }
    };

    const handleAddToCart = () => {
        if (product.stockQty <= 0) {
            showToast("Item is currently out of stock", "error");
            return;
        }

        addToCart({
            ...product,
            quantity: qty,
        });
        showToast(`${formatValue(qty)} ${product.unit} added to cart!`, "success");
    };

    // ... top of component remains the same ...

    const isOutOfStock = product.stockQty <= 0;

    return (
        <div className={`product-card ${isOutOfStock ? 'card-disabled' : ''}`}>
            <div className="product-image-container">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                />
                {/* Category Tag on Top-Left (from your original code) */}
                <span className={`category-tag ${label.class}`}>{label.text}</span>
                {/* NEW: Sold Out Badge on Top-Right */}
                {isOutOfStock && <span className="sold-out-badge">Sold Out</span>}
            </div>

            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">
                    Rs {formatValue(product.pricePerUnit)} <span className="unit">/ {product.unit}</span>
                </p>

                {/* UPDATED INFO ROW */}
                <div className="stock-info-row">
                    <p className="min-order">
                        Min: {formatValue(product.minOrderQty)} {product.unit}
                    </p>
                    <p className={`stock-status ${product.stockQty < 10 ? 'low-stock' : ''}`}>
                        Stock: {formatValue(product.stockQty)} {product.unit}
                    </p>
                </div>
            </div>

            {/* ... rest of component (qty-selector and actions) ... */}
            <div className="card-actions">
                <button className="view-details-btn" onClick={() => navigate(`/product/${product._id}`)}>
                    Details
                </button>
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? "Sold Out" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;