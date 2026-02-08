import "./featuredProducts.css";
import product1 from "../../assets/images/products/fishmeal1.png";
import product2 from "../../assets/images/products/fishmeal2.png";
import product3 from "../../assets/images/products/fishmeal3.png";

const dummyProducts = [
  {
    id: 1,
    name: "Sun Dried Fishmeal",
    price: 320,
    unit: "kg",
    image: product1,
  },
  {
    id: 2,
    name: "Processed Fish Powder",
    price: 15500,
    unit: "bag",
    image: product2,
  },
  {
    id: 3,
    name: "High Protein Feed Mix",
    price: 290,
    unit: "kg",
    image: product3,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <h2 className="section-title">Featured Products</h2>

      <div className="products-grid">
        {dummyProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">
              Rs {product.price} / {product.unit}
            </p>
            <button className="secondary-btn">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
