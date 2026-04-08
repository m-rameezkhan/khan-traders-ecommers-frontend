import React, { useState, useEffect } from "react";
import axios from "axios"; // or your custom API utility
import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import AnalyticsPanel from "./components/AnalyticsPanel";
import RecentOrders from "./components/RecentOrders";
import "./styles/Overview.css";

const Overview = () => {
  

  return (
    <div className="overview-container fade-in">
      <DashboardHeader userName="Rameez" />

      <StatsGrid />

      <div className="analytics-layout">
        <div className="main-chart-area">
          <AnalyticsPanel />
        </div>
        
        <div className="side-activity-area">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default Overview;