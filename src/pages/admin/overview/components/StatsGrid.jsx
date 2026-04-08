import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import {
  IoBagHandleOutline, IoPeopleOutline,
  IoWalletOutline, IoTrendingUpOutline, IoCubeOutline
} from "react-icons/io5";
import "../styles/StatsGrid.css";
import socket from "../../../../utils/socket"; // Importing the initialized socket instance


const StatsGrid = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings/dashboard-stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const s = res.data.stats;
      // Array prepare kar rahe hain mapping ke liye
      setStats([
        { label: "Revenue", value: s.totalRevenue, color: "green", growth: "Live", type: "currency" },
        { label: "Orders", value: s.totalOrders, color: "blue", growth: "Total", type: "number" },
        { label: "Customers", value: s.totalUsers, color: "purple", growth: "Active", type: "number" },
        { label: "Products", value: s.totalProducts, color: "orange", growth: "In Stock", type: "number" },
      ]);
      setLoading(false);
    } catch (err) {
      console.error("Stats fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Real-time Update Logic
    socket.on("newOrder", (newOrder) => {
      setStats((prevStats) =>
        prevStats.map((s) => {
          if (s.label === "Orders") return { ...s, value: s.value + 1 };
          if (s.label === "Revenue") return { ...s, value: s.value + newOrder.totalAmount };
          return s;
        })
      );
    });

    // NEW: Listen for new users (Customers update)
    socket.on("newUserRegistered", (newUser) => {
      setStats((prevStats) =>
        prevStats.map((s) => {
          if (s.label === "Customers") return { ...s, value: s.value + 1 };
          return s;
        })
      );
    });

    return () => {
      socket.off("newOrder");
      socket.off("newUserRegistered");
    };
  }, []);

  const getIcon = (label) => {
    switch (label) {
      case "Revenue": return <IoWalletOutline />;
      case "Orders": return <IoBagHandleOutline />;
      case "Customers": return <IoPeopleOutline />;
      case "Products": return <IoCubeOutline />;
      default: return <IoTrendingUpOutline />;
    }
  };

  if (loading) return <div className="stats-loader">Loading Stats...</div>;

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card-premium">
          <div className={`stat-icon-box ${stat.color}`}>
            {getIcon(stat.label)}
          </div>
          <div className="stat-info">
            <h3>{stat.label}</h3>
            <p>
              {stat.type === "currency"
                ? `Rs. ${stat.value.toLocaleString()}`
                : stat.value.toLocaleString()}
            </p>
            <span className={`growth-tag up`}>
              {stat.growth}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;