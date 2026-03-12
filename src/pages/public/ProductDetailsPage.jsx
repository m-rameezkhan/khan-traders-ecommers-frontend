import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoSyncOutline } from "react-icons/io5";
import { showToast } from "../../utils/toast.js";

// Import Components
import ProductShowcase from "../../components/users/ProductShowcase";
import ProductInfo from "../../components/users/ProductInfo";
import RelatedSidebar from "../../components/users/RelatedSidebar";

import "./styles/ProductDetails.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FIX: Scroll to Top on Page Load/ID Change ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = Array.isArray(response.data) ? response.data : response.data.products || [];
        
        setAllProducts(data);
        const found = data.find(p => p._id === id);

        if (found) {
          setProduct(found);
        } else {
          showToast("Product not found", "error");
          navigate("/shop");
        }
      } catch (err) {
        showToast("Error loading products", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  if (loading) return (
    <div className="premium-loader">
      <IoSyncOutline className="spin-icon" />
      <p>Curating details...</p>
    </div>
  );

  // --- LOGIC: Dynamic Badge Text (Heavy Duty vs Organic) ---
  const getBadgeText = () => {
    const cat = product?.category?.toLowerCase() || "";
    if (cat.includes("machinery") || cat.includes("equipment") || cat.includes("tool")) {
      return "Heavy Duty";
    }
    return "Organic / Fresh"; 
  };

  return (
    <div className="product-page-wrapper fade-in">
      <div className="main-detail-grid">
        {/* Main Content Area */}
        <div className="detail-glass-card">
          <ProductShowcase 
            product={product} 
            onBack={() => navigate(-1)} 
          />
          {/* We pass the badge text as a prop if ProductInfo supports it, 
              or ProductInfo can use the same logic internally */}
          <ProductInfo 
            product={product} 
            badgeText={getBadgeText()} 
          />
        </div>

        {/* Sidebar Area */}
        <RelatedSidebar 
          currentProduct={product} 
          allProducts={allProducts} 
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;