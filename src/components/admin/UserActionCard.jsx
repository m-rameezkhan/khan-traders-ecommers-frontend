import { IoShieldCheckmarkOutline, IoBanOutline, IoTrashOutline } from "react-icons/io5";

const UserActionCard = ({ role, status, onToggleRole, onToggleStatus, onDelete }) => (
  <div className="aud-card actions-card">
    <h3>Account Actions</h3>
    <button className="action-btn role" onClick={onToggleRole}>
      <IoShieldCheckmarkOutline /> 
      {role === "customer" ? "Promote to Manager" : "Demote to Customer"}
    </button>
    <button className="action-btn status" onClick={onToggleStatus}>
      <IoBanOutline /> 
      {status === "Active" ? "Restrict User" : "Activate User"}
    </button>
    <button className="action-btn delete" onClick={onDelete}>
      <IoTrashOutline /> Delete Account
    </button>
  </div>
);

export default UserActionCard;