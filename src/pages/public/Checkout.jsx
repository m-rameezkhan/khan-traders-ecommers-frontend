import { useLocation, useNavigate } from "react-router-dom"; // Added useLocation
import { useCart } from "../../context/CartContext";
import "./styles/checkout.css";

const Checkout = () => {
  const { cartItems } = useCart();
  const location = useLocation(); // Catch the data from Cart
  const navigate = useNavigate();

  // Get data passed via navigate(state)
  const checkoutData = location.state;

  const deliveryCharge = 250; 
  const subtotal = cartItems.reduce((acc, item) => acc + (item.pricePerUnit * item.quantity), 0);
  const grandTotal = subtotal + deliveryCharge;

  // Safety: If no data (e.g. manual URL refresh), go back to cart
  if (!checkoutData || !cartItems.length) {
    return (
      <div className="checkout-page-empty">
        <h2>Session Expired</h2>
        <button onClick={() => navigate("/cart")}>Return to Cart</button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    console.log("Order Data:", { checkoutData, cartItems, grandTotal });
    alert(`Order Placed Successfully! Total: Rs ${grandTotal}`);
  };

  return (
    <div className="checkout-page">
        <div className="checkout-container">
          <h2 className="section-title">Final Checkout</h2>
          <div className="checkout-wrapper">
            
            <div className="checkout-items">
              <h3 className="sub-header">Review Items</h3>
              {cartItems.map((item) => (
                <div key={item._id} className="checkout-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>{item.quantity} {item.unit} × Rs {item.pricePerUnit}</p>
                  </div>
                  <div className="item-total-price">Rs {item.quantity * item.pricePerUnit}</div>
                </div>
              ))}
            </div>

            <div className="checkout-summary-card">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <div className="info-section">
                   <p><strong>Deliver to:</strong> {checkoutData.isGuest ? checkoutData.guestInfo.name || "Guest" : checkoutData.user.name}</p>
                   <p><strong>Phone:</strong> {checkoutData.isGuest ? checkoutData.guestInfo.phone : checkoutData.user.phone}</p>
                   <p><strong>Address:</strong> {checkoutData.isGuest ? checkoutData.guestInfo.address : checkoutData.user.address}</p>
                </div>
                
                <hr />
                <div className="row"><span>Subtotal:</span><span>Rs {subtotal}</span></div>
                <div className="row"><span>Delivery:</span><span>Rs {deliveryCharge}</span></div>
                <hr />
                <div className="row grand-total"><span>Total Payable:</span><span>Rs {grandTotal}</span></div>
              </div>

              <button className="place-order-btn" onClick={handlePlaceOrder}>
                Place Order (Rs {grandTotal})
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Checkout;