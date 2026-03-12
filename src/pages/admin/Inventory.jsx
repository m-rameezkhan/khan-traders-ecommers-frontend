import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoAddOutline, IoTrash, IoCubeOutline,
  IoSearchOutline, IoSyncOutline, IoEyeOutline, IoStar
} from "react-icons/io5";
import "./styles/Inventory.css";

const CACHE_KEY = "kt_inventory_cache";
const API_PRODUCT_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const InventoryList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(products.length === 0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setLoading(true);
      const token = localStorage.getItem("token"); // Ensure token is defined
      
      const response = await axios.get(`${API_PRODUCT_URL}?admin=true`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const productData = Array.isArray(response.data) ? response.data : response.data.products || [];

      setProducts(productData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(productData));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_PRODUCT_URL}/delete-item/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedList = products.filter(p => p._id !== id);
      setProducts(updatedList);
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting product");
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="inventory-list-content fade-in">
      <header className="inventory-header">
        <div className="header-title">
          <div className="title-icon-box"><IoCubeOutline /></div>
          <div>
            <h1>Inventory Management</h1>
            <p>Total Products: {products.length}</p>
          </div>
        </div>
        <button className="add-product-premium" onClick={() => navigate("/admin/inventory/addProduct")}>
          <IoAddOutline /> Add Product
        </button>
      </header>

      <div className="inventory-toolbar">
        <div className="search-minimal">
          <IoSearchOutline />
          <input
            type="text"
            placeholder="Search SKU or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="tool-btn" onClick={() => fetchProducts(true)}>
          <IoSyncOutline className={loading ? "spin" : ""} /> Refresh
        </button>
      </div>

      <div className="inventory-card-container">
        <table className="inventory-table-refined">
          <thead>
            <tr>
              <th>Product Info</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item._id} className="inventory-row">
                <td>
                  <div className="item-meta">
                    <img src={item.image || "https://via.placeholder.com/40"} alt={item.name} />
                    <div>
                      <h4 className="item-name">
                        {item.name}
                        {/* Featured Star Badge */}
                        {item.isFeatured && <IoStar className="featured-star-icon" title="Featured on Homepage" />}
                      </h4>
                      <span className="item-sku">SKU-{item._id.slice(-4).toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td><span className="cat-pill">{item.category || "General"}</span></td>
                <td><span className="item-price">Rs. {item.pricePerUnit?.toLocaleString('en-US')}</span></td>
                <td><span className="stock-count">{item.stockQty?.toLocaleString('en-US')} {item.unit}</span></td>
                <td>
                  {/* Better wording for Status based on isActive */}
                  <span className={`status-tag ${item.isActive ? 'in-stock' : 'out-of-stock'}`}>
                    {item.isActive ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="text-right">
                  <div className="action-button-group">
                    <button
                      className="btn-detail-minimal"
                      onClick={() => navigate(`/admin/inventory/${item._id}`, { state: { product: item } })}
                    >
                      <IoEyeOutline /> <span>Details</span>
                    </button>
                    <button className="btn-delete-minimal" onClick={() => handleDelete(item._id)}>
                      <IoTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;