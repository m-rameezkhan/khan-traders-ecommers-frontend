import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardHeader.css";

const DashboardHeader = ({ userName }) => {
  const navigate = useNavigate();
  
  // Dynamic greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="overview-header">
      <div className="welcome-text">
        <h1>{greeting}, {userName || "Rameez"}!</h1>
        <p>Here’s what’s happening with Khan Traders today.</p>
      </div>
      <div className="header-actions">
        <button className="export-btn">Download Report</button>
        <button 
          className="primary-btn" 
          onClick={() => navigate("/admin/inventory/addProduct")}
        >
          + Add Product
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;