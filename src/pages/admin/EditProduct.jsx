import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBackOutline, IoCloudUploadOutline, IoSyncOutline, IoSaveOutline, IoStarOutline } from "react-icons/io5";
import { showToast } from "../../utils/toast"; 
import "./styles/EditProduct.css"; 

const EditProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [product] = useState(location.state?.product || null);
  const [preview, setPreview] = useState(product?.image || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const unitOptions = ["kg", "bag", "piece", "ton", "liter", "box", "pack", "bottle", "gallon", "meter", "yard", "foot", "inch"];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData();
    
    formData.append("name", form.name.value);
    formData.append("description", form.description.value);
    formData.append("pricePerUnit", form.pricePerUnit.value);
    formData.append("unit", form.unit.value);
    formData.append("category", form.category.value);
    formData.append("stockQty", form.stockQty.value);
    formData.append("minOrderQty", form.minOrderQty.value);
    
    // --- Functional Toggles ---
    formData.append("isActive", form.isActive.checked);
    formData.append("isFeatured", form.isFeatured.checked);
    
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://khan-traders-api.onrender.com/api/products/update-item/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });
      showToast("Changes saved successfully!", "success");
      navigate("/admin/inventory");
    } catch (error) {
      showToast(error.response?.data?.message || "Error updating product", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="loading-state"><IoSyncOutline className="spinner-icon" /></div>;

  return (
    <div className="inventory-list-content fade-in">
      <header className="inventory-header">
        <div className="header-title">
          <button className="back-btn" onClick={() => navigate("/admin/inventory")}>
            <IoArrowBackOutline />
          </button>
          <div>
            <h1>Product Details</h1>
            <p>ID: {id}</p>
          </div>
        </div>
      </header>

      <div className="edit-product-container">
        <div className="page-header-premium">
            <h2 style={{color: '#1b4d3e', fontWeight: 800}}>Manage {product.name}</h2>
        </div>

        <form className="form-body-content" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-column">
              <label className="input-label">Media & Status</label>
              <div className="image-dropzone-premium" onClick={() => fileInputRef.current.click()}>
                {preview ? (
                  <div className="img-wrapper">
                    <img src={preview} alt="preview" className="img-preview" />
                    <div className="img-overlay">
                      <IoSyncOutline className="spin-hover" />
                      <span>Change Image</span>
                    </div>
                  </div>
                ) : (
                  <div className="empty-upload">
                    <IoCloudUploadOutline />
                    <span>Upload Image</span>
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />

              {/* Status Toggles Section */}
              <div className="toggles-wrapper" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
                <div className="status-toggle-box visible-border">
                  <input type="checkbox" id="isActive" name="isActive" defaultChecked={product.isActive} />
                  <label htmlFor="isActive">Active on Store</label>
                </div>

                {/* --- Added isFeatured Checkbox --- */}
                <div className="status-toggle-box visible-border featured-toggle">
                  <input type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={product.isFeatured} />
                  <label htmlFor="isFeatured">Mark as Featured</label>
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="input-group">
                <label>Product Name</label>
                <input name="name" type="text" className="visible-border" defaultValue={product.name} required />
              </div>

              <div className="input-group">
                <label>Category</label>
                <input name="category" type="text" className="visible-border" defaultValue={product.category || "Fishmeal"} required />
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Price (Rs)</label>
                  <input name="pricePerUnit" type="number" className="visible-border" defaultValue={product.pricePerUnit} required />
                </div>
                <div className="input-group">
                  <label>Unit</label>
                  <select name="unit" className="visible-border" defaultValue={product.unit}>
                    {unitOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>Inventory Stock</label>
                  <input name="stockQty" type="number" className="visible-border" defaultValue={product.stockQty} required />
                </div>
                <div className="input-group">
                  <label>Min. Order</label>
                  <input name="minOrderQty" type="number" className="visible-border" defaultValue={product.minOrderQty} required />
                </div>
              </div>

              <div className="input-group">
                <label>Product Description</label>
                <textarea name="description" rows="5" className="visible-border" defaultValue={product.description} required></textarea>
              </div>
            </div>
          </div>

          <div className="form-action-footer">
            <button type="button" className="cancel-btn" onClick={() => navigate("/admin/inventory")}>Discard</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? <IoSyncOutline className="spin" /> : <><IoSaveOutline /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;