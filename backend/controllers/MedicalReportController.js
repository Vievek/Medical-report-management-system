const MedicalReport = require("../models/MedicalReport");
const User = require("../models/User");

// Create a new medical report
exports.createMedicalReport = async (req, res) => {
  try {
    const { PatientID, DoctorID } = req.body;

    // Check if PatientID and DoctorID are valid users with correct roles
    const patient = await User.findById(PatientID);
    const doctor = await User.findById(DoctorID);

    if (!patient || patient.role !== "patient") {
      return res.status(400).json({ error: "Invalid PatientID or role" });
    }
    if (!doctor || doctor.role !== "doctor") {
      return res.status(400).json({ error: "Invalid DoctorID or role" });
    }

    const medicalReport = new MedicalReport(req.body);
    await medicalReport.save();
    res.status(201).json(medicalReport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all medical reports
exports.getMedicalReports = async (req, res) => {
  try {
    const medicalReports = await MedicalReport.find()
      .populate("PatientID", "name age gender role") // Populate patient details
      .populate("DoctorID", "name specialization role"); // Populate doctor details
    res.status(200).json(medicalReports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single medical report by RecordID
exports.getMedicalReportById = async (req, res) => {
  try {
    const medicalReport = await MedicalReport.findById(req.params.id)
      .populate("PatientID", "name age gender role")
      .populate("DoctorID", "name specialization role");
    if (!medicalReport)
      return res.status(404).json({ error: "Medical report not found" });
    res.status(200).json(medicalReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a medical report by RecordID
exports.updateMedicalReport = async (req, res) => {
  try {
    const medicalReport = await MedicalReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("PatientID", "name age gender role")
      .populate("DoctorID", "name specialization role");
    if (!medicalReport)
      return res.status(404).json({ error: "Medical report not found" });
    res.status(200).json(medicalReport);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a medical report by RecordID
exports.deleteMedicalReport = async (req, res) => {
  try {
    const medicalReport = await MedicalReport.findByIdAndDelete(req.params.id);
    if (!medicalReport)
      return res.status(404).json({ error: "Medical report not found" });
    res.status(200).json({ message: "Medical report deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all medical records for a specific patient
exports.getMedicalRecordsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if the patient exists
    const patient = await User.findById(patientId);
    if (!patient || patient.role !== "patient") {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Find all medical records for the patient
    const medicalRecords = await MedicalReport.find({ PatientID: patientId })
      .populate("PatientID", "name age gender role")
      .populate("DoctorID", "name specialization role");

    res.status(200).json(medicalRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get all medical records for a specific doctor
exports.getMedicalRecordsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Check if the doctor exists
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== "doctor") {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Find all medical records for the doctor
    const medicalRecords = await MedicalReport.find({ DoctorID: doctorId })
      .populate("PatientID", "name age gender role") // Populate patient details
      .populate("DoctorID", "name specialization role"); // Populate doctor details

    res.status(200).json(medicalRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Search medical records by keyword
exports.searchMedicalRecords = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    // Fetch all medical records and populate PatientID and DoctorID
    const medicalRecords = await MedicalReport.find()
      .populate("PatientID", "name age gender role") // Populate patient details
      .populate("DoctorID", "name specialization role"); // Populate doctor details

    // Filter records where the keyword matches any field (including populated data)
    const filteredRecords = medicalRecords.filter((record) => {
      // Check if the keyword matches any of the medical record fields
      const matchesDiagnoses = record.Diagnoses.some((diagnosis) =>
        diagnosis.toLowerCase().includes(keyword.toLowerCase())
      );
      const matchesTreatments = record.Treatments.some((treatment) =>
        treatment.toLowerCase().includes(keyword.toLowerCase())
      );
      const matchesPrescriptions = record.Prescriptions.some((prescription) =>
        prescription.toLowerCase().includes(keyword.toLowerCase())
      );
      const matchesTestResults = record.TestResults.some((testResult) =>
        testResult.toLowerCase().includes(keyword.toLowerCase())
      );
      const matchesNotes = record.Notes.toLowerCase().includes(
        keyword.toLowerCase()
      );

      // Check if the keyword matches the populated PatientID or DoctorID fields
      const matchesPatientName = record.PatientID?.name
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const matchesDoctorName = record.DoctorID?.name
        .toLowerCase()
        .includes(keyword.toLowerCase());

      // Return true if any of the fields match the keyword
      return (
        matchesDiagnoses ||
        matchesTreatments ||
        matchesPrescriptions ||
        matchesTestResults ||
        matchesNotes ||
        matchesPatientName ||
        matchesDoctorName
      );
    });

    res.status(200).json(filteredRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
