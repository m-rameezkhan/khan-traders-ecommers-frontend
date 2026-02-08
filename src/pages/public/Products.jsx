import ProductCard from "../../components/common/ProductCard";
import "./styles/product.css";
import product1 from "../../assets/images/products/fishmeal1.png";
import product2 from "../../assets/images/products/fishmeal2.png";
import product3 from "../../assets/images/products/fishmeal3.png";

const dummyProducts = [
  {
    _id: "1",
    name: "Sun Dried Fishmeal",
    pricePerUnit: 320,
    unit: "kg",
    minOrderQty: 10,
    stockQty: 500,
    image: product1,
  },
  {
    _id: "2",
    name: "Processed Fishmeal Bag",
    pricePerUnit: 15500,
    unit: "bag",
    minOrderQty: 1,
    stockQty: 120,
    image: product2,
  },
  {
    _id: "3",
    name: "High Protein Feed Mix",
    pricePerUnit: 290,
    unit: "kg",
    minOrderQty: 20,
    stockQty: 800,
    image: product3,
  },
];

const Products = () => {
  return (
    <section className="products-page">
      <div className="page-header">
        <h2>Our Products</h2>
        <p>Premium quality fishmeal and feed products</p>
      </div>

      <div className="products-grid">
        {dummyProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
