import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import "./styles/AdminDashboard.css";

// Inside AdminDashboard.jsx
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`admin-layout ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
      <Sidebar isOpen={isSidebarOpen} />
      <main className="admin-main-wrapper">
        <Topbar 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          // REMOVED: breadcrumbs prop
        />
        <div className="admin-content-container fade-in-up">
          <Outlet /> {/* REMOVED: context={{ setBreadcrumbs }} */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;