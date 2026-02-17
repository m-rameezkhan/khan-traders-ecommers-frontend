import React from "react";
import {
  IoTrendingUpOutline, IoBagHandleOutline, IoPeopleOutline,
  IoWalletOutline, IoArrowForwardOutline, IoEllipsisVertical
} from "react-icons/io5";
import "./styles/Overview.css";
import { useNavigate } from "react-router";

const Overview = () => {
  const stats = [
    { label: "Revenue", value: "Rs. 1.2M", growth: "+14%", icon: <IoWalletOutline />, color: "green" },
    { label: "Orders", value: "1,240", growth: "+8%", icon: <IoBagHandleOutline />, color: "blue" },
    { label: "Customers", value: "4,821", growth: "+22%", icon: <IoPeopleOutline />, color: "purple" },
    { label: "Conversion", value: "3.2%", growth: "+1.2%", icon: <IoTrendingUpOutline />, color: "orange" },
  ];

  const navigate = useNavigate();

  return (
    <div className="overview-container">
      {/* 1. WELCOME SECTION */}
      <header className="overview-header">
        <div className="welcome-text">
          <h1>Good Morning, Rameez!</h1>
          <p>Here’s what’s happening with Khan Traders today.</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">Download Report</button>
          <button className="primary-btn" onClick={() => navigate("/admin/inventory/addProduct")} >+ Add Product</button>
        </div>
      </header>

      {/* 2. STATS GRID */}
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card-premium">
            <div className={`stat-icon-box ${stat.color}`}>{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.label}</h3>
              <p>{stat.value}</p>
              <span className="growth-tag">{stat.growth}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. ANALYTICS & ACTIVITY SECTION */}
      <div className="analytics-layout">
        <div className="main-chart-area">
          <div className="card-header">
            <h2>Revenue Forecast</h2>
            <IoEllipsisVertical className="icon-more" />
          </div>
          {/* Placeholder for a Chart library like Recharts or Chart.js */}
          <div className="chart-placeholder">
            <div className="visual-bar" style={{ height: '40%' }}></div>
            <div className="visual-bar" style={{ height: '70%' }}></div>
            <div className="visual-bar" style={{ height: '55%' }}></div>
            <div className="visual-bar" style={{ height: '90%' }}></div>
            <div className="visual-bar" style={{ height: '65%' }}></div>
            <p>Interactive Sales Analytics Visualization</p>
          </div>
        </div>

        <div className="recent-activity">
          <div className="card-header">
            <h2>Recent Orders</h2>
            <button className="text-link-btn">View All <IoArrowForwardOutline /></button>
          </div>
          <div className="activity-list">
            {[1, 2, 3, 4].map((order) => (
              <div key={order} className="activity-item">
                <div className="order-initials">AK</div>
                <div className="order-details">
                  <h4>Asim Khan</h4>
                  <span>2 items • Rs. 4,500</span>
                </div>
                <div className="order-status processing">Processing</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;