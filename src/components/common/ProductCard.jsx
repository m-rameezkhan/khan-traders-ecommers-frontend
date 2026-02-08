import { useCart } from "../../context/CartContext";
import "./styles/productCard.css";
import { showToast } from "../../utils/toast.js";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: product.minOrderQty,
        });

        // Trigger the toast!
        showToast(`${product.name} added to cart!`, "success");
        console.log(`${product.name} added to cart`);
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p className="price">
                Rs {product.pricePerUnit} / {product.unit}
            </p>

            <p className="min-order">
                Min Order: {product.minOrderQty} {product.unit}
            </p>
            <button className="secondary-btn">
                View Details
            </button>
            <button className="secondary-btn" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
