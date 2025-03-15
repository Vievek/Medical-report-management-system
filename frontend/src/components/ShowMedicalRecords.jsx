import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ShowMedicalReports = ({ fetchUrl }) => {
  const { user } = useUser(); // Access user details from context
  const [records, setRecords] = useState([]); // State to store medical records
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  // Fetch medical reports
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }
        const data = await response.json();
        setRecords(data); // Set the fetched data
      } catch (err) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchRecords();
  }, [fetchUrl]); // Re-run effect when fetchUrl changes

  // Handle delete record
  const handleDelete = async (recordId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/medical-reports/medical-reports/${recordId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete record");
      }
      // Remove the deleted record from the state
      setRecords(records.filter((record) => record._id !== recordId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      {(user?.role === "admin" || user?.role === "doctor") && (
        <>
          <button
            onClick={() => navigate("/add-report")}
            className="my-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Add Report
          </button>
        </>
      )}
      {records.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Doctor Name</th>
              <th className="py-2 px-4 border-b">Patient Name</th>
              <th className="py-2 px-4 border-b">Diagnoses</th>
              <th className="py-2 px-4 border-b">Last Updated</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b text-center">
                  {record.DoctorID.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {record.PatientID.name}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {record.Diagnoses.join(", ")}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {new Date(record.LastUpdated).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b space-x-2 text-center">
                  <button
                    onClick={() => navigate(`/medical-record/${record._id}`)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                  >
                    Show
                  </button>
                  {(user?.role === "admin" || user?.role === "doctor") && (
                    <>
                      <button
                        onClick={() =>
                          navigate(`/medical-report/edit/${record._id}`)
                        }
                        className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No medical records found.</p>
      )}
    </div>
  );
};

export default ShowMedicalReports;
