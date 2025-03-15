import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function MedicalRecord() {
  const { id } = useParams(); // Get the record ID from the URL
  const { user } = useUser(); // Access user details from context
  const [record, setRecord] = useState(null); // State to store the medical record
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

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

  // Handle delete record
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/medical-reports/medical-reports/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete record");
      }
      handleDashboard();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle navigation to dashboard based on user role
  const handleDashboard = () => {
    switch (user?.role) {
      case "patient":
        navigate("/patient-dashboard");
        break;
      case "doctor":
        navigate("/doctor-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/");
    }
  };

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

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          {(user?.role === "admin" || user?.role === "doctor") && (
            <>
              <button
                onClick={() => navigate(`/medical-report/edit/${record._id}`)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
          <button
            onClick={handleDashboard}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecord;
