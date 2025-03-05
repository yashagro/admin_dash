import { useState } from "react";
import UserPopup from "../components/Popup"; // Import the popup component

const ManageUser = () => {
  const [activeUserTab, setActiveUserTab] = useState("Manage Farmers");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup state
  const [userData, setUserData] = useState({
    mobile_no: "",
    role_id: 1, // Default to Farmers
    name: "",
    email: "",
  });

  const userTabs = [
    { name: "Manage Farmers", icon: "👨‍🌾", roleId: 1 },
    { name: "Manage Agronomist", icon: "🧑‍🔬", roleId: 3 },
    { name: "Manage Admin", icon: "🛡️", roleId: 2 },
    { name: "Manage Dealers", icon: "📺", roleId: 4 },
    { name: "Manage Bulk Buyers", icon: "🛅", roleId: 5 },
  ];

  const handleTabClick = (tabName) => {
    const selectedTab = userTabs.find((tab) => tab.name === tabName);
    const newRoleId = selectedTab ? selectedTab.roleId : 0;

    setActiveUserTab(tabName);
    setUserData((prev) => ({
      ...prev,
      role_id: newRoleId, // Update role_id dynamically
    }));
  };

  return (
    <div className="p-4 md:p-6">
      {/* User Management Heading */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-gray-500 text-sm">
            Manage all users and their roles in the system
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 overflow-auto">
        {userTabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center px-3 py-2 rounded-lg text-sm md:text-base transition-all cursor-pointer ${
              activeUserTab === tab.name
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick(tab.name)}
          >
            <span className="mr-2">{tab.icon}</span> {tab.name}
          </button>
        ))}
      </div>

      {/* User List */}
      <div className="mt-4 bg-gray-100 p-4 rounded-lg flex justify-between items-center">
        <h3 className="text-lg font-medium">{activeUserTab} List</h3>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          + Add {activeUserTab.replace("Manage ", "")}
        </button>
      </div>

      {/* Hidden Input Field to Store User Data */}
      <input type="hidden" name="userData" value={JSON.stringify(userData)} />

      {/* Render Popup if Open */}
      {isPopupOpen && <UserPopup onClose={() => setIsPopupOpen(false)} userData={userData} />}
    </div>
  );
};

export default ManageUser;
