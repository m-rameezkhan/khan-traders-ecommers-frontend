import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/common/ProductCard";
import "./styles/product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loader">Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="products-page">
      <div className="page-header">
        <h2>Our Products</h2>
        <p>Premium quality fishmeal and feed products</p>
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
};

export default Products;