import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoArrowBack, IoCopyOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import ItemsSummary from "../../components/admin/ItemsSummary.jsx";
import CustomerCard from "../../components/admin/CustomerCard.jsx";
import StatusCard from "../../components/admin/StatusCard.jsx";
import { showToast } from "../../utils/toast.js";
import "./styles/AdminOrderDetail.css";
import { buildApiUrl } from "../../utils/apiConfig";

const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Editable States
  const [newStatus, setNewStatus] = useState("");
  const [newDeliveryFee, setNewDeliveryFee] = useState(0);

  const token = localStorage.getItem("token");

  // Fetch Order
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(buildApiUrl(`/api/orders/${id}`), {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrder(res.data);
        setNewStatus(res.data.status);
        setNewDeliveryFee(res.data.deliveryFee || 0);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    if (id) fetchDetails();
  }, [id, token]);

  // Update Logic
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axios.put(buildApiUrl(`/api/orders/${id}/order-status`),
        { status: newStatus, deliveryFee: Number(newDeliveryFee) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrder(prev => ({ ...prev, status: newStatus, deliveryFee: Number(newDeliveryFee) }));
      showToast("Order updated successfully!", "success");
    } catch (err) {
      console.error(err);
      alert("Failed to update order.");
    } finally {
      setUpdating(false);
    }
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(order._id);
    showToast("Order ID copied!", "info");
  };

  if (!order) return <div className="um-loader">Loading Order Details...</div>;

  return (
    <div className="admin-detail-view">
      {/* Header */}
      <header className="detail-view-header">
        <button className="back-link" onClick={() => navigate("/admin/orders")}>
          <IoArrowBack /> Back
        </button>
        <div className="order-id-badge" onClick={copyOrderId} title="Click to copy">
          ORDER ID: {order._id} <IoCopyOutline />
        </div>
      </header>

      <div className="detail-grid">
        <div className="detail-main">
          {/* Component 1: Items Table */}
          <ItemsSummary
            items={order.items}
            totalAmount={order.totalAmount}
            deliveryFee={order.deliveryFee} // Original fee from DB
            newDeliveryFee={newDeliveryFee} // Editable fee state
            setNewDeliveryFee={setNewDeliveryFee} // Setter
          />
        </div>

        <div className="detail-sidebar">
          {/* Component 2: Customer Info (With Link) */}
          <CustomerCard
            user={order.user}
            address={order.deliveryAddress}
          />

          {/* Component 3: Status Actions */}
          <StatusCard
            status={newStatus}
            setStatus={setNewStatus}
            onSave={handleUpdate}
            updating={updating}
            initialStatus={order.status}      // The original status from API
            deliveryFee={order.deliveryFee}    // The original fee from API
            newDeliveryFee={newDeliveryFee}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
