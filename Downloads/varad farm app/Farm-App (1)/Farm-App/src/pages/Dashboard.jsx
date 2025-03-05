import { useState } from "react";
import { FaUsers, FaUserCheck, FaStore, FaQuestionCircle, FaBell, FaChartLine } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";

const Dashboard = () => {
  const [filterPeriod, setFilterPeriod] = useState("17 April 2020 - 21 May 2020");

  return (
    <div className="p-6 bg-[#f9fafb] min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <div className="bg-white p-3 rounded-lg shadow flex items-center gap-2 cursor-pointer">
          <span className="text-blue-500">📅</span>
          <span className="text-sm">{filterPeriod}</span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        <OverviewCard icon={<FaUsers />} count="75" label="Registered Farmers" />
        <OverviewCard icon={<FaUserCheck />} count="357" label="Subscribed Farmers" highlighted />
        <OverviewCard icon={<FaUserCheck />} count="65" label="Agronomist" />
        <OverviewCard icon={<FaStore />} count="$128" label="Dealers" />
        <OverviewCard icon={<FaQuestionCircle />} count="1" label="Q&A" highlighted />
      </div>

      {/* Recent Transactions */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <TransactionItem title="Payment Received" amount="₹15,000" description="from Farmer Group A" time="2 hours ago" />
        <TransactionItem title="Subscription Payment" amount="₹XXX" description="from Farmer A" time="5 hours ago" />
        <TransactionItem title="Dealer Purchase" amount="₹45,000" description="for bulk fertilizers" time="5 hours ago" />
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <QuickLink icon={<MdOutlineAddCircle />} label="Add New Users" />
          <QuickLink icon={<FaUserCheck />} label="Add New Agronomist" />
          <QuickLink icon={<FaStore />} label="Add New Dealers" />
          <QuickLink icon={<FaBell />} label="Send Notification" />
          <QuickLink icon={<FaChartLine />} label="View Report" />
        </div>
      </div>
    </div>
  );
};

// Overview Card Component
const OverviewCard = ({ icon, count, label, highlighted }) => {
  return (
    <div className={`p-4 rounded-lg shadow flex items-center gap-3 cursor-pointer ${highlighted ? "bg-white" : "bg-white"}`}>
      <div className="text-green-600 text-2xl">{icon}</div>
      <div>
        <h3 className="text-xl font-bold">{count}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

// Transaction Item Component
const TransactionItem = ({ title, amount, description, time }) => {
  return (
    <div className="border-b py-2 last:border-none cursor-pointer">
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <p className="text-sm text-gray-500">{amount} {description}</p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  );
};

// Quick Link Button Component
const QuickLink = ({ icon, label }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center gap-2 border border-green-500 hover:bg-green-100 cursor-pointer">
      <div className="text-green-600 text-2xl">{icon}</div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default Dashboard;
