import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoSearchOutline, IoCallOutline, IoAddOutline,
  IoRefreshOutline, IoChevronForwardOutline, IoPersonCircleOutline
} from "react-icons/io5";
import "./styles/UserManager.css";
import { buildApiUrl } from "../../utils/apiConfig";

const UserManager = () => {
  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState("customer");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = buildApiUrl("/api/users");
  const token = localStorage.getItem("token");

  const fetchUsers = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = Array.isArray(res.data) ? res.data : (res.data.users || []);
      setUsers(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => {
    const role = (u.role || "").toLowerCase();
    const matchesTab = activeSubTab === "manager" ? role !== "customer" : role === "customer";
    const matchesSearch = (u.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) return <div className="um-loader">Syncing Member Directory...</div>;

  return (
    <div className="um-wrapper admin-fade-in-up">
      <header className="um-premium-header">
        <div className="um-title-section">
          <h1>Member Directory</h1>
          <p>Click on a member to manage permissions or view activity</p>
        </div>

        <div className="um-actions-section">
          <div className="um-search-container">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="um-header-tools">
            <div className="um-tab-switcher">
              <button className={activeSubTab === "customer" ? "active" : ""} onClick={() => setActiveSubTab("customer")}>Customers</button>
              <button className={activeSubTab === "manager" ? "active" : ""} onClick={() => setActiveSubTab("manager")}>Staff</button>
            </div>

            <button
              className={`um-icon-btn ${refreshing ? "spinning" : ""}`}
              onClick={() => fetchUsers(true)}
              disabled={refreshing}
            >
              <IoRefreshOutline />
            </button>

            <button className="um-primary-add-btn" onClick={() => navigate("/admin/users/add")}>
              <IoAddOutline /> <span>New Member</span>
            </button>
          </div>
        </div>
      </header>

      <div className="um-card-stack">
        <div className="um-table-header">
          <span className="col-id">ID</span>
          <span className="col-user">User</span>
          <span className="col-contact">Contact</span>
          <span className="col-status">Status</span>
          <span className="col-action"></span>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="um-empty-state">No members found in this category.</div>
        ) : (
          filteredUsers.map((user, index) => (
            <div 
              key={user._id} 
              className={`um-premium-card ${user.status === "Restricted" ? "is-restricted" : ""}`}
              onClick={() => navigate(`/admin/users/${user._id}`)}
            >
              <span className="um-user-id">#{String(index + 1).padStart(3, '0')}</span>

              <div className="um-user-info">
                <div className={`um-avatar-circle ${user.role}`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="um-name-details">
                  <h4>{user.name}</h4>
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="um-contact-info">
                <IoCallOutline />
                <span>{user.phone || "---"}</span>
              </div>

              <div className="um-meta-badges">
                <span className={`um-status-pill ${user.status?.toLowerCase() || 'active'}`}>
                  {user.status || 'Active'}
                </span>
              </div>

              <div className="um-row-actions">
                <IoChevronForwardOutline className="nav-arrow" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManager;
