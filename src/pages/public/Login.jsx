import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showToast } from "../../utils/toast";
import "./styles/auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Changed from 'email' to 'identifier'
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send 'identifier' to match your new backend controller logic
      await login({ identifier, password });
      showToast("Welcome back!");
      navigate("/");
    } catch (err) {
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="auth-logo-space">
          <i className="fa-solid fa-leaf"></i>
        </div>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Login with Email or Phone Number</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text" // Changed to text to allow phone numbers
            placeholder="Email or Phone Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>

        {/* Optional: Forgot Password link for extra professionalism */}
        <p style={{ marginTop: '10px' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.85rem', fontWeight: '400' }}>
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};



export default Login;