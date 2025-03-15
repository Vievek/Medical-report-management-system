const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MedicalReportRoutes = require("./routes/MedicalReportRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cors = require("cors");

// Enable CORS
app.use(cors());

// Load environment variables
dotenv.config();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/medical-reports", MedicalReportRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Node.js CRUD App");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
