import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Users, Calendar, ShoppingCart, FileText, BarChart, HelpCircle, Settings, Menu } from "lucide-react";
import yashLogo from "../images/yash_logo.png"; // Update this path accordingly

const menuItems = [
  { name: "Home", icon: <Home size={20} />, path: "/dashboard" },
  { name: "Manage User", icon: <Users size={20} />, path: "/manage-user" },
  { name: "Schedule", icon: <Calendar size={20} />, path: "/schedule" },
  { name: "Farm Visit", icon: <FileText size={20} />, path: "/farm-visit" },
  { name: "E-commerce", icon: <ShoppingCart size={20} />, path: "/ecommerce" },
  { name: "Content & Courses", icon: <FileText size={20} />, path: "/content" },
  { name: "Report and analytics", icon: <BarChart size={20} />, path: "/analytics" },
  { name: "Help & Support", icon: <HelpCircle size={20} />, path: "/help" },
  { name: "Setting", icon: <Settings size={20} />, path: "/settings" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md">
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div className={`fixed md:relative h-auto w-60 bg-white shadow-md p-5 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        {/* Close Button for Mobile */}
        <button onClick={toggleSidebar} className="md:hidden absolute top-4 right-4">
          ✖
        </button>

        {/* Yash Logo */}
        <div className="flex justify-center mb-6">
          <img src={yashLogo} alt="Yash Logo" className="w-32 h-auto" />
        </div>

        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center w-full text-left px-4 py-2 rounded-lg transition ${
                  location.pathname === item.path ? "bg-green-100 text-green-600" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={toggleSidebar} // Close sidebar on item click (mobile)
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
