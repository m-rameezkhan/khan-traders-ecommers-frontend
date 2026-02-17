import { Routes, Route } from "react-router-dom";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import Cart from "../pages/public/Cart";
import Checkout from "../pages/public/Checkout";
import OrderSuccess from "../pages/public/OrderSuccess";
import Orders from "../pages/public/Orders";
import UserProfile from "../pages/public/UserProfile";

// Admin Components
import AdminDashboard from "../pages/admin/AdminDashboard";
import Dashboard from "../components/admin/Overview";
import ProductManager from "../pages/admin/Inventory";
import UserManager from "../pages/admin/UserManager";
import OrderManager from "../pages/admin/OrderManager";
import AddProduct from "../pages/admin/AddProduct";

// Route Guards
import { PrivateRoute, AdminRoute } from "./PrivateRoute";
import AdminOrderDetail from "../pages/admin/AdminOrderDetail";
import AdminUserDetail from "../pages/admin/AdminUserDetail";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/user-profile" element={<UserProfile />} />

      {/* Standard Protected Routes (Customers & Admins) */}
      <Route element={<PrivateRoute />}>
        <Route path="/orders" element={<Orders />} />
      </Route>

      {/* Admin ONLY Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<ProductManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="orders" element={<OrderManager />} />
          <Route path="inventory/addProduct" element={<AddProduct />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
          <Route path="users/:id" element={<AdminUserDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}