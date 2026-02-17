import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserHeader from "../../components/admin/UserHeader";
import UserIdentityCard from "../../components/admin/UserIdentityCard";
import UserActionCard from "../../components/admin/UserActionCard";
import UserEditForm from "../../components/admin/UserEditForm.jsx";
import "./styles/AdminUserDetail.css";

const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_URL = "https://khan-traders-api.onrender.com/api/users";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", role: "customer", password: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          role: res.data.role || "customer",
          password: ""
        });
      } catch (err) {
        navigate("/admin/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, token, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveProfile = async () => {
    setUpdating(true);
    try {
      const dataToUpdate = { ...formData };
      if (!dataToUpdate.password?.trim()) delete dataToUpdate.password;

      const res = await axios.put(`${API_URL}/${id}`, dataToUpdate, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...user, ...res.data });
      setFormData(prev => ({ ...prev, password: "" }));
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const toggleStatus = async () => {
    const newStatus = user.status === "Active" ? "Restricted" : "Active";
    if(!window.confirm(`Are you sure you want to ${newStatus}?`)) return;
    try {
      await axios.patch(`${API_URL}/${id}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...user, status: newStatus });
    } catch (err) { alert("Failed to update status"); }
  };

  const toggleRole = async () => {
    const newRole = user.role === "customer" ? "manager" : "customer";
    if(!window.confirm(`Change role to ${newRole.toUpperCase()}?`)) return;
    try {
      const res = await axios.put(`${API_URL}/${id}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...user, role: res.data.role });
      setFormData(prev => ({ ...prev, role: res.data.role }));
    } catch (err) { alert("Failed to change role"); }
  };

  const handleDelete = async () => {
    if(!window.confirm("Delete user permanent?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      navigate("/admin/users");
    } catch (err) { alert("Delete failed"); }
  };

  if (loading) return <div className="aud-loader">Loading User Profile...</div>;

  return (
    <div className="aud-wrapper">
      <UserHeader userId={user._id} onBack={() => navigate("/admin/users")} />
      
      <div className="aud-grid">
        <aside className="aud-sidebar">
          <UserIdentityCard user={user} />
          <UserActionCard 
            role={user.role} 
            status={user.status} 
            onToggleRole={toggleRole} 
            onToggleStatus={toggleStatus} 
            onDelete={handleDelete} 
          />
        </aside>

        <main className="aud-main">
          <UserEditForm 
            formData={formData} 
            updating={updating} 
            onChange={handleChange} 
            onSave={handleSaveProfile} 
          />
        </main>
      </div>
    </div>
  );
};

export default AdminUserDetail;