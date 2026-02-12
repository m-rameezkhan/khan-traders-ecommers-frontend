import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // Added for empty state
import { 
  IoBagCheckOutline, 
  IoTimeOutline, 
  IoLocationOutline, 
  IoPrintOutline,
  IoCartOutline 
} from "react-icons/io5";
import OrderCard from "../../components/common/OrderCard";
import "./styles/orders.css";

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders");
      } finally {
        // Adding a slight artificial delay (optional) makes the transition less jarring
        setTimeout(() => setLoading(false), 100);
      }
    };
    fetchOrders();
  }, [token]);

  const handlePrint = (orderId) => {
    const card = document.getElementById(`order-card-${orderId}`);
    card.classList.add("print-this-only");
    window.print();
    card.classList.remove("print-this-only");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  // --- 1. Loading State ---
  if (loading) {
    return (
      <div className="orders-loader-container">
        <div className="orders-spinner"></div>
        <p>Fetching your orders...</p>
      </div>
    );
  }

  // --- 2. Empty State ---
  if (orders.length === 0) {
    return (
      <div className="orders-empty-state">
        <IoCartOutline size={80} color="#ccc" />
        <h2>No Orders Found</h2>
        <p>Looks like you haven't placed any orders yet.</p>
        <Link to="/products" className="shop-now-btn">Start Shopping</Link>
      </div>
    );
  }

  // ... imports stay the same

return (
    <div className="orders-page">
      <div className="orders-container">
        <header className="orders-header-main">
          <h1><IoBagCheckOutline /> Order History</h1>
          <p>Manage and track your recent purchases</p>
        </header>

        <div className="orders-list">
          {orders.map((order, index) => (
            <OrderCard 
              key={order._id}
              order={order}
              index={index}
              totalOrders={orders.length}
              onPrint={handlePrint}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;