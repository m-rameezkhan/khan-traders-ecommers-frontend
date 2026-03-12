import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./featuredProducts.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatValue = (num) => {
    return num ? num.toLocaleString('en-US') : "0";
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Ensure there is a trailing slash or correct join for the query param
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/products?featured=true`;

        const response = await axios.get(apiUrl);

        // ROBUST CHECK: Extract the array regardless of how the backend sends it
        let productData = [];
        if (Array.isArray(response.data)) {
          productData = response.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          productData = response.data.products;
        }

        setProducts(productData);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) return <div className="loader">Loading Featured...</div>;
  if (error) return null; // Hide section if there's an error
  if (products.length === 0) return null; // Hide if no featured items found

  return (
    <section className="featured-products">
      <h2 className="section-title">Featured Products</h2>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-img-wrapper">
              <img 
                src={product.image} 
                alt={product.name} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
              />
              {/* Added: Specific label for Machinery */}
              {product.category === "machinery" && <span className="machinery-badge">Industrial</span>}
            </div>
            
            <div className="product-card-content">
                <h3>{product.name}</h3>
                <p className="price">
                  Rs {formatValue(product.pricePerUnit)} <span className="unit-text">/ {product.unit}</span>
                </p>
                <button 
                  className="secondary-btn" 
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  View Details
                </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;