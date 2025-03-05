import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/S"; // Correct Sidebar Import
import Navbar from "./components/Navbar";
import ManageUser from "./pages/MU"; // Renamed to a meaningful name
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; 
import VerifyOTP from "./pages/VerifyOTP";
import Schedule from "./pages/Schedule"; // Fixed Import

// Define Other Pages
const FarmVisit = () => <div className="p-5">Farm Visit</div>;
const ECommerce = () => <div className="p-5">E-commerce</div>;
const Content = () => <div className="p-5">Content</div>;
const Analytics = () => <div className="p-5">Report and Analytics</div>;
const HelpSupport = () => <div className="p-5">Help & Support</div>;
const Settings = () => <div className="p-5">Settings</div>;

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Routes>
        {/* Default Route - Login */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Main Layout with Sidebar & Navbar */}
        <Route
          path="/*"
          element={
            <div className="flex min-h-screen bg-gray-50">
              {/* Sidebar */}
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <div className="p-5">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/manage-user" element={<ManageUser />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/farm-visit" element={<FarmVisit />} />
                    <Route path="/ecommerce" element={<ECommerce />} />
                    <Route path="/content" element={<Content />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/help" element={<HelpSupport />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
