import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; // Added missing import
import {
  IoBagCheckOutline,
  IoCartOutline
} from "react-icons/io5";
import OrderCard from "../../components/common/OrderCard";
import "./styles/orders.css";
import { buildApiUrl } from "../../utils/apiConfig";

const Orders = () => {
  const { token, loading: authLoading } = useAuth(); // Added authLoading if your context has it
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      // 1. Get the latest token directly from storage to be safe on refresh
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return; 
      }

      try {
        const res = await axios.get(buildApiUrl("/api/orders/my-orders"), {
          headers: { Authorization: `Bearer ${storedToken}` }
        });

        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch error", err);
        setOrders([]); 

        if (err.response?.status === 401) {
          // If token is invalid/expired, clear it and go to login
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if AuthContext isn't busy initializing
    if (!authLoading) {
      fetchOrders();
    }
  }, [token, authLoading, navigate]);

  const handlePrint = (orderId) => {
    window.print(); // Simpler approach; usually browser handles the layout via CSS @media print
  };

  // --- 1. Loading State ---
  if (loading || authLoading) {
    return (
      <div className="orders-loader-container">
        <div className="orders-spinner"></div>
        <p>Fetching your orders...</p>
      </div>
    );
  }

  // --- 2. Empty/Unauthorized State ---
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="orders-empty-state">
        <IoCartOutline size={80} color="#ccc" />
        <h2>No Orders Found</h2>
        <p>Looks like you haven't placed any orders yet or your session expired.</p>
        <Link to="/products" className="shop-now-btn">Start Shopping</Link>
      </div>
    );
  }

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
