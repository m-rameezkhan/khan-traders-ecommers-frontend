import React from "react";
import { NavLink } from "react-router-dom"; 
import { 
  IoGridOutline, IoCubeOutline, IoPeopleOutline, 
  IoCartOutline, IoSettingsOutline, IoLogOutOutline, 
  IoTrendingUpOutline
} from "react-icons/io5";
import "./styles/Sidebar.css";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: "dashboard", label: "Dashboard", icon: <IoGridOutline /> },
    { path: "analytics", label: "Analytics", icon: <IoTrendingUpOutline /> },
    { path: "inventory", label: "Inventory", icon: <IoCubeOutline /> },
    { path: "users", label: "Customers", icon: <IoPeopleOutline /> },
    { path: "orders", label: "Orders", icon: <IoCartOutline /> },
    { path: "settings", label: "Settings", icon: <IoSettingsOutline /> },
  ];

  return (
    <aside className={`sidebar-container ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="brand-logo">
          <span className="logo-icon">KT</span>
        </div>
        <div className="brand-text">
          <h2>KHAN</h2>
          <span>TRADERS</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/admin/${item.path}`}
            // We use the isActive prop provided by NavLink's className callback
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {/* 1. Icon and Label render normally */}
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            
            {/* 2. Simplified Indicator Logic */}
            {/* We can use CSS to show/hide the indicator based on the .active class on nav-link */}
            <div className="active-indicator" />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }}>
          <IoLogOutOutline />
          <span className="nav-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;