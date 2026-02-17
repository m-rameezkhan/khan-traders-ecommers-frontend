import React, { useState } from "react";
import {
  IoSearchOutline, IoAddOutline, IoPencil, IoTrash,
  IoCubeOutline, IoCloseOutline, IoCloudUploadOutline, IoInformationCircleOutline
} from "react-icons/io5";
import "./styles/Inventory.css";
import ProductModal from "./ProductModal";

const Inventory = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleUpdateProduct = (updatedProduct) => {
    // If we are editing an existing product
    if (selectedProduct) {
      setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
    } else {
      // If we are adding a new product
      const newProduct = { ...updatedProduct, _id: Date.now().toString() };
      setProducts([...products, newProduct]);
    }
  };

  // Sample data based on your Mongoose Schema
  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Premium Fishmeal",
      description: "Organic high-protein fishmeal ideal for high-yield poultry farming.",
      pricePerUnit: 150,
      unit: "kg",
      minOrderQty: 50,
      stockQty: 500,
      category: "Fishmeal",
      image: "https://images.unsplash.com/photo-1511094059471-3c97819924c0?w=200",
      isActive: true
    }
  ]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="inventory-wrapper fade-in-up">
      <header className="inventory-header">
        <div className="header-title">
          <div className="title-icon-box"><IoCubeOutline /></div>
          <div>
            <h1>Inventory</h1>
            <p>Managing {products.length} products in catalog</p>
          </div>
        </div>
        <button className="add-product-premium" onClick={() => setIsModalOpen(true)}>
          <IoAddOutline /> Add Product
        </button>
      </header>

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
            {products.map((item) => (
              <tr key={item._id} className="inventory-row">
                <td>
                  <div className="item-meta">
                    <img src={item.image} alt="" />
                    <div>
                      <h4 className="item-name">{item.name}</h4>
                      <span className="item-sku">SKU-{item._id.slice(-4)}</span>
                    </div>
                  </div>
                </td>
                <td><span className="cat-pill">{item.category}</span></td>
                <td><span className="item-price">Rs. {item.pricePerUnit}/{item.unit}</span></td>
                <td>
                  <div className="stock-info-cell">
                    <span className="stock-count">{item.stockQty}</span>
                    <span className="stock-unit">{item.unit}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-tag ${item.isActive ? 'active' : 'inactive'}`}>
                    {item.isActive ? 'Live' : 'Hidden'}
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

      {/* --- PRODUCT MODAL --- */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={handleUpdateProduct}
      />
    </div>
  );
};

export default Inventory;