const express = require("express");
const router = express.Router();
const medicalReportController = require("../controllers/MedicalReportController");

// CRUD routes for Medical Reports
router.post("/medical-reports", medicalReportController.createMedicalReport);
router.get("/medical-reports", medicalReportController.getMedicalReports);
router.get(
  "/medical-reports/:id",
  medicalReportController.getMedicalReportById
);
router.put("/medical-reports/:id", medicalReportController.updateMedicalReport);
router.delete(
  "/medical-reports/:id",
  medicalReportController.deleteMedicalReport
);

// Additional routes
router.get(
  "/medical-report/patient/:patientId",
  medicalReportController.getMedicalRecordsByPatientId
); // Get records by Patient ID
router.get(
  "/medical-report/doctor/:doctorId",
  medicalReportController.getMedicalRecordsByDoctorId
); // Get records by Doctor ID
router.get(
  "/medical-report/search",
  medicalReportController.searchMedicalRecords
); // Search medical records

module.exports = router;
