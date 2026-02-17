import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { IoCloseOutline, IoCloudUploadOutline, IoSyncOutline } from "react-icons/io5";
import "./styles/ProductModal.css";

const ProductModal = ({ isOpen, onClose, product, onSave }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Set initial preview when product changes
  useEffect(() => {
    if (product?.image) {
      setPreview(product.image);
    } else {
      setPreview(null);
    }
  }, [product]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a temporary URL to show the image immediately
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a mock updated product object
    const formData = new FormData(e.target);
    const updatedData = {
      ...product,
      name: formData.get("name"),
      pricePerUnit: formData.get("price"),
      stockQty: formData.get("stock"),
      image: preview, // The new local preview URL (will be replaced by API URL later)
    };

    onSave(updatedData); // Send data back to Inventory.jsx
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal-container scale-in" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="header-text">
            <h2>{product ? "Edit Product" : "Add New Item"}</h2>
            <p>Click the image box to upload or change photos.</p>
          </div>
          <button className="close-btn" onClick={onClose}><IoCloseOutline /></button>
        </div>

        <div className="modal-body-scroll">
          <form id="product-form" className="modal-form-content" onSubmit={handleSubmit}>
            <div className="form-grid">
              
              <div className="form-column">
                <label className="input-label">Product Visual</label>
                {/* Clicking this box triggers the hidden input */}
                <div className="image-dropzone-premium visible-border" onClick={() => fileInputRef.current.click()}>
                  {preview ? (
                    <div className="img-wrapper">
                      <img src={preview} alt="preview" className="img-preview" />
                      <div className="img-overlay">
                        <IoSyncOutline className="spin-hover" />
                        <span>Change Photo</span>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-upload">
                      <IoCloudUploadOutline />
                      <span>Click to Select Image</span>
                    </div>
                  )}
                </div>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  hidden 
                  accept="image/*" 
                />

                <div className="status-toggle-box visible-border">
                  <input type="checkbox" id="isActive" name="isActive" defaultChecked={product?.isActive ?? true} />
                  <label htmlFor="isActive">Show on Storefront</label>
                </div>
              </div>

              <div className="form-column">
                <div className="input-group">
                  <label>Product Title</label>
                  <input className="visible-border" name="name" type="text" defaultValue={product?.name} required />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Price (Rs)</label>
                    <input className="visible-border" name="price" type="number" defaultValue={product?.pricePerUnit} required />
                  </div>
                  <div className="input-group">
                    <label>Unit Type</label>
                    <select className="visible-border" name="unit" defaultValue={product?.unit}>
                      <option value="kg">per kg</option>
                      <option value="bag">per bag</option>
                    </select>
                  </div>
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>Stock Qty</label>
                    <input className="visible-border" name="stock" type="number" defaultValue={product?.stockQty} required />
                  </div>
                  <div className="input-group">
                    <label>Min. Order</label>
                    <input className="visible-border" name="minOrder" type="number" defaultValue={product?.minOrderQty} required />
                  </div>
                </div>
                <div className="input-group">
                  <label>Description</label>
                  <textarea className="visible-border" name="description" rows="4" defaultValue={product?.description}></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          <button type="submit" form="product-form" className="save-btn">Save Product</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;