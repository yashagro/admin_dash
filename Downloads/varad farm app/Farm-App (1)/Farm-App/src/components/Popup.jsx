import { useState, useEffect } from "react";

const UserPopup = ({ onClose, userData }) => {
  const [formData, setFormData] = useState({
    mobile_no: "",
    role_id: userData.role_id, // Default from parent
    name: "",
    email: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role_id: userData.role_id, // Update role_id when the user type changes
    }));
  }, [userData.role_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve auth token (Ensure it's stored in localStorage)
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authorization failed. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://194.164.148.246/api/auth/expert/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add auth header
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("User Data Submitted Successfully:", data);

      // Close the popup on successful submission
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit user data. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add New User</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Hidden Role ID Field */}
          <input type="hidden" name="role_id" value={formData.role_id} />

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPopup;
