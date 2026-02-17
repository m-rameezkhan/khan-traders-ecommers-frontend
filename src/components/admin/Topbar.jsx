import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  IoChevronBackOutline, 
  IoNotificationsOutline, 
  IoCalendarOutline, 
  IoTimeOutline 
} from "react-icons/io5";
import "./styles/Topbar.css";

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const pathnames = location.pathname.split("/").filter((x) => x);

  const getInitials = (name) => {
    if (!name) return "AD";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  // Logic to determine label based on context
  const getLabel = (name, index, allSegments) => {
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(name);
    
    if (isMongoId) {
      const parentSegment = allSegments[index - 1]?.toLowerCase();
      
      // Contextual naming
      if (parentSegment === "users") return "User Details";
      if (parentSegment === "orders") return "Order Details";
      if (parentSegment === "product") return "Product Details";
      
      return "Details"; 
    }

    // Convert camelCase or slugs to Title Case
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  return (
    <header className="topbar-container">
      <div className="topbar-left">
        <button
          className={`toggle-btn ${!isSidebarOpen ? "rotated" : ""}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <IoChevronBackOutline />
        </button>

        <div className="breadcrumb">
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const isRootAdmin = name.toLowerCase() === "admin";
            
            // Pass the current index and full path to the label helper
            const formattedName = getLabel(name, index, pathnames);

            return (
              <React.Fragment key={routeTo}>
                {isLast || isRootAdmin ? (
                  <span className={isLast ? "current-page" : "root-category"}>
                    {formattedName}
                  </span>
                ) : (
                  <Link to={routeTo} className="parent-crumb">
                    {formattedName}
                  </Link>
                )}
                {!isLast && <span className="separator"> / </span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-status-info">
          <div className="status-item">
            <IoCalendarOutline />
            <span>{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="status-item">
            <IoTimeOutline />
            <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <div className="action-icons">
          <button className="icon-btn">
            <IoNotificationsOutline />
            <span className="topbar-badge"></span>
          </button>
        </div>

        <div className="profile-section">
          <div className="avatar">{getInitials(user?.name)}</div>
          <div className="user-info">
            <span className="name">{user?.name || "Admin User"}</span>
            <span className="role">{user?.role === 'admin' ? 'Super Admin' : 'Staff'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;