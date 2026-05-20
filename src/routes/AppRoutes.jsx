// User Components
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
import ProductDetails from "../pages/public/ProductDetailsPage";
import About from "../pages/public/About";
import ContactUs from "../pages/public/ContactUs";

// Admin Components
import AdminDashboard from "../pages/admin/AdminDashboard";
import Overview from "../pages/admin/overview/Overview";
import ProductManager from "../pages/admin/Inventory";
import UserManager from "../pages/admin/UserManager";
import OrderManager from "../pages/admin/OrderManager";
import AddProduct from "../pages/admin/AddProduct";
import AdminOrderDetail from "../pages/admin/AdminOrderDetail";
import AdminUserDetail from "../pages/admin/AdminUserDetail";
import EditProduct from "../pages/admin/EditProduct";
import AdminSettings from "../pages/admin/AdminSettings";
import AnalyticsPage from "../pages/admin/AnalyticsPage";

// Route Guards
import { PrivateRoute, AdminRoute } from "./PrivateRoute";


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
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/Product/:id" element={<ProductDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {/* Standard Protected Routes (Customers & Admins) */}
      <Route element={<PrivateRoute />}>
        <Route path="/orders" element={<Orders />} />
      </Route>

      {/* Admin ONLY Protected Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Overview />} />
          <Route path="dashboard" element={<Overview />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="inventory" element={<ProductManager />} />
          <Route path="users" element={<UserManager />} />
          <Route path="orders" element={<OrderManager />} />
          <Route path="inventory/addProduct" element={<AddProduct />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
          <Route path="users/:id" element={<AdminUserDetail />} />
          <Route path="/admin/inventory/:id" element={<EditProduct />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
