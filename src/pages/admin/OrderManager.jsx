import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { IoSearchOutline } from "react-icons/io5"; // Added search icon
import OrderSummaryCard from "../../components/admin/OrderSummaryCard";
import "./styles/OrderManager.css";
import { useNavigate } from "react-router";

const socket = io("https://khan-traders-api.onrender.com");

const OrderManager = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchOrders();

    socket.on("newOrder", (newOrder) => {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      new Audio("/notification-sound.mp3").play().catch(() => { });
    });

    return () => socket.off("newOrder");
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Logic for Filtering and Searching ---
  const filteredOrders = orders.filter((order) => {
    // 1. Status Filter
    const matchesStatus = filter === "all" || order.status === filter;

    // 2. Search Filter (Name, ID, or Total Amount)
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      order.user?.name?.toLowerCase().includes(searchLower) ||
      order._id.toLowerCase().includes(searchLower) ||
      order.totalAmount.toString().includes(searchLower);

    return matchesStatus && matchesSearch;
  });

  const filterOptions = ["all", "pending", "confirmed", "packed", "shipped", "delivered", "cancelled"];

  if (loading) return <div className="um-loader">Loading Live Dashboard...</div>;

  return (
    <div className="om-wrapper">
      <header className="om-header">
        {/* Top Row: Title & Search */}
        <div className="om-header-top">
          <div className="um-title-section">
            <h1>Order Management</h1>
            <p className="live-indicator">
              <span className="blink-dot"></span> Real-time stream
            </p>
          </div>

          <div className="om-search-box">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search Name, ID, or Amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Bottom Row: Filters */}
        <div className="om-header-bottom">
          <div className="om-filters">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                className={`om-filter-btn ${filter === opt ? "active" : ""}`}
                onClick={() => setFilter(opt)}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="om-list-container">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderSummaryCard
              key={order._id}
              order={order}
              onClick={() => navigate(`/admin/orders/${order._id}`)}
            />
          ))
        ) : (
          <div className="no-orders">
            {searchQuery || filter !== "all" ? "No matches found for your filters." : "No orders found."}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManager;