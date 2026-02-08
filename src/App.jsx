import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import "./styles/main.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <AppRoutes />
      
      {/* ADD THIS LINE HERE */}
      <div id="toast-container"></div>

      <Footer />
    </>
  );
}

export default App;
