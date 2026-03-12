import { useState } from "react"; 
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; 
import { Link, useNavigate } from "react-router-dom";
import CheckoutPopup from "../../components/checkout/CheckoutPopup"; 
import "./styles/cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated, user } = useAuth(); 
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); 

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.pricePerUnit * item.quantity), 0);

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout", { state: { isGuest: false, user: user, guestInfo: null } });
    } else {
      setShowPopup(true);
    }
  };

  const handlePopupContinue = (guestData) => {
    setShowPopup(false);
    navigate("/checkout", { state: guestData });
  };

  // Utility to format numbers with commas
  const formatCurrency = (num) => {
    return num.toLocaleString('en-EN'); // Using en-EN for comma format (e.g., 1,000,000)
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some items to get started!</p>
        <Link to="/products" className="shop-now-btn">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        <h2 className="cart-title">Your Shopping Cart</h2>
        
        <div className="cart-list">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="item-main">
                <img src={item.image} alt={item.name} className="item-img" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  {/* Comma added here */}
                  <p className="unit-price">Rs {formatCurrency(item.pricePerUnit)} <span className="unit">/ {item.unit}</span></p>
                  
                  <div className="quantity-section">
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity - 1)}>—</button>
                    <span className="qty-number">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="item-actions">
                {/* Comma added here */}
                <p className="item-subtotal">Rs {formatCurrency(item.pricePerUnit * item.quantity)}</p>
                <button className="delete-btn" onClick={() => removeFromCart(item._id)}>
                  <i className="fa-solid fa-trash-can"></i> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-checkout-footer">
          <div className="footer-content">
            <div className="total-group">
              <span className="total-label">Grand Total:</span>
              {/* Comma added here */}
              <span className="total-amount">Rs {formatCurrency(totalPrice)}</span>
            </div>
            <button className="main-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <CheckoutPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        onContinue={handlePopupContinue} 
      />
    </div>
  );
};

export default Cart;