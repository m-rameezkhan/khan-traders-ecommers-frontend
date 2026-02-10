import { Link } from "react-router-dom";
import "./styles/orderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <div className="order-success-box">
        {/* Animated Checkmark or Forest Icon */}
        <div className="success-icon-wrapper">
           <i className="fa-solid fa-circle-check"></i>
        </div>

        <h2>Order Confirmed!</h2>
        <p className="success-msg">
          Your fresh products are being prepared. We've sent a confirmation 
          to your phone.
        </p>

        <div className="order-details-mini">
           <p>Order Status: <span>Processing</span></p>
           <p>Payment: <span>Cash on Delivery</span></p>
        </div>

        <div className="success-actions">
          <Link to="/orders" className="view-orders-btn">
            Track My Order
          </Link>
          <Link to="/" className="continue-shop-link">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
