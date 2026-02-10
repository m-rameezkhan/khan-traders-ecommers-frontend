import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../utils/toast";
import EditInfoModal from "../../components/common/EditInfoModal";
import { IoArrowBack, IoAlertCircleOutline } from "react-icons/io5"; 
import "./styles/checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { token, user: authUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const checkoutData = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backendError, setBackendError] = useState(""); 
  
  // NEW: State for Dynamic Delivery Fee
  const [deliveryCharge, setDeliveryCharge] = useState(250); // Fallback to 250
  const [isFetchingFee, setIsFetchingFee] = useState(true);

  const [editableInfo, setEditableInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 1. Fetch Dynamic Delivery Fee
  useEffect(() => {
    const fetchFee = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/settings/delivery-fee");
        const data = await response.json();
        if (data.deliveryFee) {
          setDeliveryCharge(data.deliveryFee);
        }
      } catch (error) {
        console.error("Error fetching delivery fee:", error);
      } finally {
        setIsFetchingFee(false);
      }
    };
    fetchFee();
  }, []);

  useEffect(() => {
    if (checkoutData?.isGuest) {
      setEditableInfo({
        name: checkoutData.guestInfo?.name || "",
        phone: checkoutData.guestInfo?.phone || "",
        address: checkoutData.guestInfo?.address || "",
      });
    } else if (authUser) {
      setEditableInfo({
        name: authUser.name || "",
        phone: authUser.phone || "",
        address: authUser.address || "",
      });
    }
  }, [checkoutData, authUser]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);
  const grandTotal = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {
    setBackendError(""); 

    if (!editableInfo.phone || !editableInfo.address) {
      setBackendError("Delivery address and phone number are required.");
      return;
    }

    try {
      const orderPayload = {
        deliveryAddress: editableInfo.address,
        phone: editableInfo.phone,
        name: editableInfo.name,
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.pricePerUnit,
        })),
        deliveryFee: deliveryCharge, 
        totalAmount: grandTotal,
      };

      const response = await fetch("http://localhost:5000/api/orders/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();
        showToast("Order placed successfully!", "success");
        navigate("/order-success", { replace: true });
      } else {
        setBackendError(data.message || "Failed to place order");
      }
    } catch (error) {
      setBackendError("Server connection lost. Please try again.");
    }
  };

  if (!cartItems.length) return null;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-nav-header">
          <Link to="/cart" className="back-link">
            <IoArrowBack /> Back to Cart
          </Link>
          <h2>Checkout</h2>
        </div>

        <div className="checkout-grid">
          <div className="items-column">
            <div className="section-card">
              <h3>Review Items ({cartItems.length})</h3>
              <div className="checkout-items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="checkout-item-row">
                    <img src={item.image} alt={item.name} className="item-thumb" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-qty">
                        {item.quantity} {item.unit} × Rs {item.pricePerUnit}
                      </p>
                    </div>
                    <div className="item-total-price">
                      Rs {item.pricePerUnit * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="summary-column">
            <div className="summary-card sticky-summary">
              <h3>Order Summary</h3>

              <div className="delivery-summary-section">
                <div className="summary-header-flex">
                  <h3>Delivery Details</h3>
                  <button className="edit-btn" onClick={() => setIsModalOpen(true)}>Edit Info</button>
                </div>

                <div className="info-group">
                  <div className="info-row-detail">
                    <span className="label">Name:</span>
                    <p className="user-name">{editableInfo.name || "Guest User"}</p>
                  </div>

                  <div className="info-row-detail">
                    <span className="label">Phone:</span>
                    <span className={`value ${!editableInfo.phone ? "error-text" : ""}`}>
                      {editableInfo.phone || "Not provided"}
                    </span>
                  </div>

                  <div className="info-row-detail">
                    <span className="label">Address:</span>
                    <span className={`value ${!editableInfo.address ? "error-text" : ""}`}>
                      {editableInfo.address || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Items Subtotal</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <div className="label-with-subtext">
                    <span>Delivery Fee</span>
                    <small>Standard Rate</small>
                  </div>
                  {/* Show dots while fetching to avoid layout jump */}
                  <span>{isFetchingFee ? "..." : `Rs ${deliveryCharge}`}</span>
                </div>
                <hr />
                <div className="price-row total">
                  <span>Grand Total</span>
                  <span>Rs {isFetchingFee ? "..." : grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {backendError && (
                <div className="ui-error-box">
                  <IoAlertCircleOutline />
                  <p>{backendError}</p>
                </div>
              )}

              <button 
                className="place-order-btn" 
                onClick={handlePlaceOrder}
                disabled={isFetchingFee} // Disable if fee hasn't loaded
              >
                {isFetchingFee ? "Loading..." : "Confirm Order"}
              </button>
              <p className="secure-text">🔒 Secure Checkout Process</p>
            </div>
          </div>
        </div>
      </div>

      <EditInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        info={editableInfo}
        setInfo={setEditableInfo}
      />
    </div>
  );
};

export default Checkout;