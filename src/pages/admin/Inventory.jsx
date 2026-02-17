import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoAddOutline, IoPencil, IoTrash, IoCubeOutline,
  IoSearchOutline, IoSyncOutline
} from "react-icons/io5";
import "./styles/Inventory.css";
import ProductModal from "../../components/admin/ProductModal";

const CACHE_KEY = "kt_inventory_cache";

const InventoryList = () => {
  const navigate = useNavigate();
  
  // 1. Initialize state with localStorage data if it exists
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  // 2. Only show loading if we have NO cached data
  const [loading, setLoading] = useState(products.length === 0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setLoading(true);
      
      const response = await axios.get("https://khan-traders-api.onrender.com/api/products");
      const data = Array.isArray(response.data) ? response.data : response.data.products;
      
      const productData = data || [];
      setProducts(productData);
      
      // 3. Save to localStorage for next time
      localStorage.setItem(CACHE_KEY, JSON.stringify(productData));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch automatically if cache is empty
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const handleUpdateProduct = (updatedProduct) => {
    let newProducts;
    if (selectedProduct) {
      newProducts = products.map(p => p._id === updatedProduct._id ? updatedProduct : p);
    } else {
      newProducts = [...products, updatedProduct];
    }
    setProducts(newProducts);
    localStorage.setItem(CACHE_KEY, JSON.stringify(newProducts));
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="loading-state">
        <IoSyncOutline className="spinner-icon" />
        <p>Fetching Inventory...</p>
      </div>
    );
  }

  return (
    <div className="inventory-list-content fade-in">
      <header className="inventory-header">
        <div className="header-title">
          <div className="title-icon-box"><IoCubeOutline /></div>
          <div>
            <h1>Inventory</h1>
            <p>Managing {products.length} products</p>
          </div>
        </div>
        <button 
          className="add-product-premium" 
          onClick={() => navigate("/admin/inventory/addProduct")}
        >
          <IoAddOutline /> Add Product
        </button>
      </header>

      <div className="inventory-toolbar">
        <div className="search-minimal">
          <IoSearchOutline />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-actions">
          {/* Manual refresh button always hits the server */}
          <button className="tool-btn" onClick={() => fetchProducts(true)}>
            <IoSyncOutline /> Force Refresh
          </button>
        </div>
      </div>

      <div className="inventory-card-container">
        <table className="inventory-table-refined">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="text-right">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item._id} className="inventory-row">
                <td>
                  <div className="item-meta">
                    <img src={item.image || "https://via.placeholder.com/40"} alt={item.name} />
                    <div>
                      <h4 className="item-name">{item.name}</h4>
                      <span className="item-sku">SKU-{item._id.slice(-4).toUpperCase()}</span>
                    </div>
                  </div>
                </td>
                <td><span className="cat-pill">{item.category || "General"}</span></td>
                <td><span className="item-price">Rs. {item.pricePerUnit}/{item.unit}</span></td>
                <td>
                  <div className="stock-info-cell">
                    <span className="stock-count">{item.stockQty}</span>
                    <span className="stock-unit">{item.unit}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-tag ${item.isActive !== false ? 'in-stock' : 'out-of-stock'}`}>
                    {item.isActive !== false ? 'Live' : 'Hidden'}
                  </span>
                </td>
                <td className="text-right">
                  <div className="action-button-group">
                    <button className="btn-edit-solid" onClick={() => handleEditClick(item)}>
                      <IoPencil /> <span>Edit</span>
                    </button>
                    <button className="btn-delete-solid">
                      <IoTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        onSave={handleUpdateProduct}
      />
    </div>
  );
};

export default InventoryList;