import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoCloudUploadOutline, IoBagAddOutline } from "react-icons/io5";
import "./styles/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const token = localStorage.getItem("token"); 

    try {
      await axios.post("https://khan-traders-api.onrender.com/api/products/add-item", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      localStorage.removeItem("kt_inventory_cache");
      navigate("/admin/inventory"); 
    } catch (err) {
      // Log the specific error from the server to the console
      console.error("Server Error Response:", err.response?.data);
      alert(err.response?.data?.message || "Upload Failed. Ensure all fields are correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container fade-in-up">
      <header className="page-header">
        <div className="header-icon"><IoBagAddOutline /></div>
        <div className="header-text">
          <h1>Add New Product</h1>
          <p>Create a new entry in your digital catalog</p>
        </div>
      </header>
      
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Image Upload Section */}
          <div className="upload-box visible-border" onClick={() => fileInputRef.current.click()}>
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <div className="placeholder">
                <IoCloudUploadOutline /> 
                <span>Upload Product Image</span>
              </div>
            )}
            <input 
              type="file" name="image" ref={fileInputRef} hidden 
              onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} 
              required
            />
          </div>

          <div className="fields-column">
            {/* Product Name */}
            <div className="field-group">
              <label>Product Name</label>
              <input type="text" name="name" className="visible-border" placeholder="e.g. Fishmeal Coocker" required />
            </div>
            
            {/* Description */}
            <div className="field-group">
              <label>Description</label>
              <textarea name="description" className="visible-border" rows="3" placeholder="High protein fishmeal..."></textarea>
            </div>

            {/* Row 1: Price and Category */}
            <div className="row">
               <div className="field-group">
                 <label>Price per Unit (Rs)</label>
                 <input type="number" name="pricePerUnit" className="visible-border" placeholder="200" required />
               </div>
               <div className="field-group">
                 <label>Category</label>
                 <input type="text" name="category" className="visible-border" placeholder="Fishmeal" required />
               </div>
            </div>

            {/* Row 2: Stock and Unit */}
            <div className="row">
               <div className="field-group">
                 <label>Total Stock Qty</label>
                 <input type="number" name="stockQty" className="visible-border" placeholder="450" required />
               </div>
               <div className="field-group">
                 <label>Unit</label>
                 <input type="text" name="unit" className="visible-border" placeholder="kg" defaultValue="kg" required />
               </div>
            </div>

            {/* Row 3: Min Order Quantity */}
            <div className="row">
               <div className="field-group">
                 <label>Minimum Order Quantity</label>
                 {/* FIXED: Changed name to minOrderQty to match your JSON structure */}
                 <input type="number" name="minOrderQty" className="visible-border" placeholder="20" required />
               </div>
               <div className="field-group">
                  <label>Initial Status</label>
                  <select name="isActive" className="visible-border">
                    <option value="true">Live (Visible to users)</option>
                    <option value="false">Hidden (Draft mode)</option>
                  </select>
               </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? "Creating Product..." : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;