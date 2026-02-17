import { IoTimeOutline, IoWalletOutline } from "react-icons/io5";
import "./styles/UserIdentityCard.css"

const UserIdentityCard = ({ user }) => (
  <div className="aud-card identity-card">
    <div className={`aud-avatar ${user.role}`}>
      {user.name?.[0]?.toUpperCase() || "U"}
    </div>
    <h2>{user.name}</h2>
    <p className="aud-email">{user.email}</p>
    
    <div className="aud-badges">
      <span className={`badge-role ${user.role}`}>{user.role}</span>
      <span className={`badge-status ${user.status?.toLowerCase() || 'active'}`}>
        {user.status || "Active"}
      </span>
    </div>

    <div className="aud-joined-date">
      <IoTimeOutline /> Joined: {new Date(user.createdAt).toLocaleDateString()}
    </div>

    <div className="stats-section">
      <h3><IoWalletOutline /> Customer Value</h3>
      <div className="stat-row"><span>Total Spent</span><strong>Rs. 0</strong></div>
      <div className="stat-row"><span>Total Orders</span><strong>0</strong></div>
    </div>
  </div>
);

export default UserIdentityCard;