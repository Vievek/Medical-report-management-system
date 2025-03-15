import React from "react";
import ShowMedicalReports from "../components/ShowMedicalRecords";

function AdminRecords() {
  return (
    <>
      <ShowMedicalReports
        fetchUrl={`http://localhost:3000/api/medical-reports/medical-reports`}
      />
    </>
  );
}

export default AdminRecords;
