import React from "react";
import { useUser } from "../context/UserContext";

const AdminDetails = () => {
  const { user } = useUser();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-700">Admin Details</h3>
      <p className="text-gray-600">Name: {user?.name}</p>
      <p className="text-gray-600">Role: {user?.role}</p>
    </div>
  );
};

export default AdminDetails;
