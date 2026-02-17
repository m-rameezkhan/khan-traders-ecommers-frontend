import { IoArrowBack } from "react-icons/io5";

const UserHeader = ({ userId, onBack }) => (
  <header className="aud-header">
    <button className="aud-back-btn" onClick={onBack}>
      <IoArrowBack /> Back to Directory
    </button>
    <div className="aud-header-info">
      <span className="aud-id">USER ID: {userId}</span>
    </div>
  </header>
);

export default UserHeader;