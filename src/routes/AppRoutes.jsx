import { Routes, Route } from "react-router-dom";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import Cart from "../pages/public/Cart";
import PrivateRoute from "./PrivateRoute";
import Checkout from "../pages/public/Checkout";
import OrderSuccess from "../pages/public/OrderSuccess";
import Orders from "../pages/public/Orders";
import UserProfile from "../pages/public/UserProfile";


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


      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/orders" element={<Orders />} />
      </Route>

    </Routes>
  );
}
