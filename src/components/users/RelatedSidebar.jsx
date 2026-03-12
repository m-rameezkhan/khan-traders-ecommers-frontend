import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoFlashOutline, IoArrowForwardOutline, IoCartOutline } from "react-icons/io5";
import "./styles/RelatedSidebar.css";

const RelatedSidebar = ({ currentProduct, allProducts }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(10);

  // --- UTILITY: EN-US Comma Formatting ---
  const formatValue = (num) => {
    return num ? num.toLocaleString('en-US') : "0";
  };

  // --- LOGIC: Dynamic Tag for Related Items ---
  const getDynamicTag = (item) => {
    // If it's in the same category as what we are viewing
    if (item.category === currentProduct.category) {
      const cat = item.category?.toLowerCase() || "";
      if (cat.includes("machinery") || cat.includes("equipment")) return "Industrial";
      if (cat.includes("chemical")) return "Premium";
      return "Similar";
    }
    return null;
  };

  // 1. Get products in the same category (excluding current)
  const relatedByCategory = allProducts.filter(
    (p) => p.category === currentProduct.category && p._id !== currentProduct._id
  );

  // 2. Get products in other categories
  const otherProducts = allProducts.filter(
    (p) => p.category !== currentProduct.category && p._id !== currentProduct._id
  );

  // 3. Combine them: Same category first, then others
  const combinedProducts = [...relatedByCategory, ...otherProducts];
  
  // 4. Slice for pagination
  const displayedItems = combinedProducts.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <aside className="related-sidebar">
      <div className="sidebar-header">
        <div className="header-icon-box">
          <IoFlashOutline />
        </div>
        <div className="header-text">
          <h3>Discovery</h3>
          <p>Similar & Popular Items</p>
        </div>
      </div>
      
      <div className="related-list">
        {displayedItems.length > 0 ? (
          displayedItems.map(item => {
            const dynamicTag = getDynamicTag(item);
            return (
              <div 
                key={item._id} 
                className="related-item-card"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="related-img">
                  <img src={item.image} alt={item.name} />
                  {/* Dynamic Tag Replacement */}
                  {dynamicTag && (
                    <span className={`match-tag ${dynamicTag.toLowerCase()}`}>
                      {dynamicTag}
                    </span>
                  )}
                </div>
                <div className="related-meta">
                  <span className="related-cat-label">{item.category}</span>
                  <h4>{item.name}</h4>
                  <div className="related-price-row">
                      {/* Formatted Price */}
                      <p className="price">Rs. {formatValue(item.pricePerUnit)}</p>
                      <IoArrowForwardOutline className="arrow-icon" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-related">No discovery items found</p>
        )}
      </div>

      {visibleCount < combinedProducts.length && (
        <button className="show-more-sidebar-btn" onClick={handleShowMore}>
          Show 10 More Products
        </button>
      )}

      <div className="premium-delivery-banner">
        <div className="delivery-icon-circle">
            <IoCartOutline />
        </div>
        <div className="delivery-content">
            <h4>Free Delivery</h4>
            {/* Formatted Delivery Threshold */}
            <p>On orders above <b>Rs. {formatValue(5000)}</b></p>
        </div>
        <div className="banner-glow"></div>
      </div>
    </aside>
  );
};

export default RelatedSidebar;