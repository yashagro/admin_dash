import React, { useState } from "react";
import { Search, Bell, MessageCircle, Gift, Settings, Menu, ChevronDown } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4 w-full">
      {/* Mobile Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="flex items-center border rounded-lg px-3 py-2 w-2/3 sm:w-1/2 md:w-1/3 max-w-xs">
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full text-gray-600"
        />
        <Search className="text-gray-400 cursor-pointer" size={18} />
      </div>

      {/* Icons & Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowIcons(!showIcons)}
          className="md:hidden flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <span className="text-gray-700 text-sm">More</span>
          <ChevronDown size={18} />
        </button>

        {/* Icons Section - Hidden on Mobile */}
        <div className={`absolute right-0 top-12 bg-white shadow-lg rounded-lg p-3 flex flex-col gap-2 w-40 ${showIcons ? "block" : "hidden"} md:hidden`}>
          {[
            { icon: <Bell size={20} className="text-blue-500" />, count: 21, bg: "bg-blue-100", textBg: "bg-blue-500" },
            { icon: <MessageCircle size={20} className="text-blue-500" />, count: 53, bg: "bg-blue-100", textBg: "bg-blue-500" },
            { icon: <Gift size={20} className="text-gray-600" />, count: 15, bg: "bg-gray-100", textBg: "bg-gray-500" },
            { icon: <Settings size={20} className="text-red-500" />, count: 19, bg: "bg-red-100", textBg: "bg-red-500" },
          ].map((item, index) => (
            <div key={index} className={`relative flex items-center justify-center w-10 h-10 ${item.bg} rounded-xl cursor-pointer hover:bg-opacity-80`}>
              {item.icon}
              <span className={`absolute top-0 right-0 ${item.textBg} text-white text-xs px-1.5 rounded-full`}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Icons Section - Always Visible on Larger Screens */}
      <div className="hidden md:flex items-center gap-4">
        {[
          { icon: <Bell size={20} className="text-blue-500" />, count: 21, bg: "bg-blue-100", textBg: "bg-blue-500" },
          { icon: <MessageCircle size={20} className="text-blue-500" />, count: 53, bg: "bg-blue-100", textBg: "bg-blue-500" },
          { icon: <Gift size={20} className="text-gray-600" />, count: 15, bg: "bg-gray-100", textBg: "bg-gray-500" },
          { icon: <Settings size={20} className="text-red-500" />, count: 19, bg: "bg-red-100", textBg: "bg-red-500" },
        ].map((item, index) => (
          <div key={index} className={`relative flex items-center justify-center w-10 h-10 ${item.bg} rounded-xl cursor-pointer hover:bg-opacity-80`}>
            {item.icon}
            <span className={`absolute top-0 right-0 ${item.textBg} text-white text-xs px-1.5 rounded-full`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <span className="text-gray-700 hidden md:block">
          Hello, <span className="font-semibold">Samantha</span>
        </span>
        <img
          src="https://randomuser.me/api/portraits/women/50.jpg"
          alt="User"
          className="w-10 h-10 rounded-full border cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Navbar;
