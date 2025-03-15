import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import PatientRecords from "./pages/PatientRecords";
import AdminRecords from "./pages/AdminRecords";
import DoctorRecords from "./pages/DoctorRecords";
import MedicalRecord from "./pages/MedicalRecord";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddMedicalReport from "./pages/AddMedicalReport";
import EditMedicalReport from "./pages/EditMedicalReport";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/admin-records" element={<AdminRecords />} />
        <Route path="/doctor-records" element={<DoctorRecords />} />
        <Route path="/medical-record/:id" element={<MedicalRecord />} />
        <Route path="/add-report" element={<AddMedicalReport />} />
        <Route
          path="/medical-report/edit/:id"
          element={<EditMedicalReport />}
        />
      </Routes>
    </Router>
  );
};

export default App;
