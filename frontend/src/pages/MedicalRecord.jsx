import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MedicalRecord() {
  const { id } = useParams(); // Get the record ID from the URL
  const [record, setRecord] = useState(null); // State to store the medical record
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch the medical record details
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/medical-reports/medical-reports/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch record");
        }
        const data = await response.json();
        setRecord(data); // Set the fetched record
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchRecord();
  }, [id]); // Re-run effect when the ID changes

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (!record) {
    return <div className="text-center py-4">No record found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Medical Record Details</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Patient Name:</h3>
            <p className="text-gray-600">{record.PatientID.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Doctor Name:</h3>
            <p className="text-gray-600">{record.DoctorID.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Date Created:</h3>
            <p className="text-gray-600">
              {new Date(record.DateCreated).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Last Updated:</h3>
            <p className="text-gray-600">
              {new Date(record.LastUpdated).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Diagnoses:</h3>
            <p className="text-gray-600">{record.Diagnoses.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Treatments:</h3>
            <p className="text-gray-600">{record.Treatments.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Prescriptions:</h3>
            <p className="text-gray-600">{record.Prescriptions.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Test Results:</h3>
            <p className="text-gray-600">{record.TestResults.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Notes:</h3>
            <p className="text-gray-600">{record.Notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecord;
