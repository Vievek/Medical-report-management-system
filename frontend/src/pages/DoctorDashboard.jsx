import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import DoctorDetails from "../components/DoctorDetails"; // Example child component

const DoctorDashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Doctor Dashboard
        </h2>
        <p className="text-gray-600">Welcome, Dr. {user?.name}!</p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
        {/* Example child component */}
        <DoctorDetails />
      </div>
    </div>
  );
};

export default DoctorDashboard;
