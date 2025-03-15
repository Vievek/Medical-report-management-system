import React from "react";
import ShowMedicalReports from "../components/ShowMedicalRecords";
import { useUser } from "../context/UserContext";

const PatientRecords = () => {
  const { user } = useUser(); // Access user details from context

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center my-8">
        Medical Reports
      </h2>
      <ShowMedicalReports
        fetchUrl={`http://localhost:3000/api/medical-reports/medical-report/patient/${user._id}`}
      />
    </>
  );
};

export default PatientRecords;
