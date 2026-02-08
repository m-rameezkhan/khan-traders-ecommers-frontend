import { useState } from "react"; // Added useState
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // Added useAuth
import { Link, useNavigate } from "react-router-dom";
import CheckoutPopup from "../../components/checkout/CheckoutPopup"; // Import Popup
import "./styles/cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated, user } = useAuth(); // Get auth status
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for popup

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.pricePerUnit * item.quantity), 0);

  // Logic: If logged in, go to checkout. If guest, show popup.
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout", { state: { isGuest: false, user: user, guestInfo: null } });
    } else {
      setShowPopup(true);
    }
  };

  // Called after guest fills the popup form
  const handlePopupContinue = (guestData) => {
    setShowPopup(false);
    navigate("/checkout", { state: guestData });
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
                  <p className="unit-price">Rs {item.pricePerUnit} <span className="unit">/ {item.unit}</span></p>
                  
                  <div className="quantity-section">
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity - 1)}>—</button>
                    <span className="qty-number">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </div>

              <div className="item-actions">
                <p className="item-subtotal">Rs {item.pricePerUnit * item.quantity}</p>
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
              <span className="total-amount">Rs {totalPrice}</span>
            </div>
            <button className="main-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Popup only shows if user is not logged in */}
      <CheckoutPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
        onContinue={handlePopupContinue} 
      />
    </div>
  );
};

export default Cart;