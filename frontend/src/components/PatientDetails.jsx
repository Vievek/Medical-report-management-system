import React from "react";
import { useUser } from "../context/UserContext";

const PatientDetails = () => {
  const { user } = useUser();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-700">Patient Details</h3>
      <p className="text-gray-600">Name: {user?.name}</p>
      <p className="text-gray-600">Age: {user?.age}</p>
      <p className="text-gray-600">Gender: {user?.gender}</p>
    </div>
  );
};

export default PatientDetails;
