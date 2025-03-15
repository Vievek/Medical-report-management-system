const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema({
  RecordID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  }, // Primary Key
  PatientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Foreign Key referencing User
  DoctorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Foreign Key referencing User
  DateCreated: { type: Date, default: Date.now }, // Automatically set to current date
  LastUpdated: { type: Date, default: Date.now }, // Automatically set to current date
  Diagnoses: [{ type: String }], // List of diagnoses
  Treatments: [{ type: String }], // List of treatments
  Prescriptions: [{ type: String }], // List of prescribed medications
  TestResults: [{ type: String }], // List of test results (lab, imaging, etc.)
  Notes: { type: String }, // Additional notes from the doctor
});

// Update LastUpdated field before saving
medicalReportSchema.pre("save", function (next) {
  this.LastUpdated = Date.now();
  next();
});

module.exports = mongoose.model("MedicalReport", medicalReportSchema);
