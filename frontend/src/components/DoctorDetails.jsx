import React from "react";
import { useUser } from "../context/UserContext";

const DoctorDetails = () => {
  const { user } = useUser();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-700">Doctor Details</h3>
      <p className="text-gray-600">Name: {user?.name}</p>
      <p className="text-gray-600">Specialization: {user?.specialization}</p>
    </div>
  );
};

export default DoctorDetails;
