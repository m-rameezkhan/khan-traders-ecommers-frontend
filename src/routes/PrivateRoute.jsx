import { Navigate, Outlet } from "react-router-dom";

// 1. Basic Protection (Any logged-in user)
export const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// 2. Admin Protection (Only role === "admin")
export const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  
  // Check if role is admin (matching your API response)
  if (user.role !== "admin") {
    alert("Access Denied: Admins Only");
    return <Navigate to="/" replace />; // Redirect customers to home
  }

  return <Outlet />;
};