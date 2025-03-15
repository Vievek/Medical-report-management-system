import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AdminDetails from "../components/AdminDetails"; // Example child component

const AdminDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRecords = () => {
    navigate("/admin-records");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>
        <p className="text-gray-600">Welcome, Admin {user?.name}!</p>

        <AdminDetails />
        <div className="flex justify-center w-full gap-4 mt-4">
          <button
            onClick={handleRecords}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            See My Medical History
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
