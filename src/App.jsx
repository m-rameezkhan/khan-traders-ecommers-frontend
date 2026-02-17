import { useLocation } from "react-router-dom"; // Add this import
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import "./styles/main.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();
  
  // Define which paths should hide the main Navbar/Footer
  // Note: Since your routes are /admin-dashboard, /order-manager, etc.
  // we check if the path includes 'admin' or 'manager'
  const isHideLayout = location.pathname.includes('admin') || 
                       location.pathname.includes('manager');

  return (
    <>
      {/* Hide Navbar on Admin/Manager pages */}
      {!isHideLayout && <Navbar />}

      <AppRoutes />
      
      <div id="toast-container"></div>

      {/* Hide Footer on Admin/Manager pages */}
      {!isHideLayout && <Footer />}
    </>
  );
}

export default App;