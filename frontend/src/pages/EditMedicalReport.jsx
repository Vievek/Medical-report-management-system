import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
const EditMedicalReport = () => {
  const { user } = useUser();
  const { id } = useParams(); // Get the report ID from the URL
  const [formData, setFormData] = useState({
    PatientID: "",
    DoctorID: "",
    Diagnoses: [],
    Treatments: [],
    Prescriptions: [],
    TestResults: [],
    Notes: "",
  });
  const [patients, setPatients] = useState([]); // State for patients
  const [doctors, setDoctors] = useState([]); // State for doctors
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate();

  // Fetch the medical report by ID
  useEffect(() => {
    console.log(user);
    const fetchReport = async () => {
      try {
        console.log("Fetching medical report...");

        const response = await fetch(
          `http://localhost:3000/api/medical-reports/medical-reports/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch medical report");
        }
        const reportData = await response.json();
        console.log("Medical report:", reportData);

        // Set the form data with the fetched report
        setFormData({
          PatientID: reportData.PatientID,
          DoctorID: reportData.DoctorID,
          Diagnoses: reportData.Diagnoses,
          Treatments: reportData.Treatments,
          Prescriptions: reportData.Prescriptions,
          TestResults: reportData.TestResults,
          Notes: reportData.Notes,
          patientName: reportData.PatientID.name,
          doctorName: reportData.DoctorID.name,
          LastUpdated: new Date(),
        });
      } catch (err) {
        console.error("Error fetching medical report:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Fetch patients and doctors
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching patients and doctors...");

        // Fetch patients
        const patientsResponse = await fetch(
          "http://localhost:3000/api/auth/users/patient"
        );
        if (!patientsResponse.ok) {
          throw new Error("Failed to fetch patients");
        }
        const patientsData = await patientsResponse.json();
        console.log("Patients:", patientsData);
        setPatients(patientsData.users || []); // Extract the `users` array

        // Fetch doctors
        const doctorsResponse = await fetch(
          "http://localhost:3000/api/auth/users/doctor"
        );
        if (!doctorsResponse.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const doctorsData = await doctorsResponse.json();
        console.log("Doctors:", doctorsData);
        setDoctors(doctorsData.users || []); // Extract the `users` array
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Updating medical report:", formData);

      const response = await fetch(
        `http://localhost:3000/api/medical-reports/medical-reports/${id}`,
        {
          method: "PUT", // Use PUT to update the report
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update medical report");
      }

      const data = await response.json();
      console.log("Medical report updated:", data);

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user.role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error updating medical report:", err);
      setError(err.message);
    } finally {
      setLoading(false);
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
      <h2 className="text-2xl font-bold mb-4">Edit Medical Report</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="space-y-4">
          {/* Patient Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Patient:
            </label>
            <select
              name="PatientID"
              value={formData.PatientID}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={formData.PatientID}>{formData.patientName}</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor:
            </label>
            <select
              name="DoctorID"
              value={formData.DoctorID}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value={formData.DoctorID}>{formData.doctorName}</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Diagnoses */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Diagnoses:
            </label>
            <input
              type="text"
              name="Diagnoses"
              value={formData.Diagnoses.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  Diagnoses: e.target.value.split(", "),
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter diagnoses separated by commas"
            />
          </div>

          {/* Treatments */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Treatments:
            </label>
            <input
              type="text"
              name="Treatments"
              value={formData.Treatments.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  Treatments: e.target.value.split(", "),
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter treatments separated by commas"
            />
          </div>

          {/* Prescriptions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prescriptions:
            </label>
            <input
              type="text"
              name="Prescriptions"
              value={formData.Prescriptions.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  Prescriptions: e.target.value.split(", "),
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter prescriptions separated by commas"
            />
          </div>

          {/* Test Results */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Test Results:
            </label>
            <input
              type="text"
              name="TestResults"
              value={formData.TestResults.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  TestResults: e.target.value.split(", "),
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter test results separated by commas"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes:
            </label>
            <textarea
              name="Notes"
              value={formData.Notes}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional notes"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Updating..." : "Update Medical Report"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMedicalReport;
