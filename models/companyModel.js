import mongoose from "mongoose";

const courseEnumValues = ["Under Graduate", "Post Graduate","Both"];
const departmentEnumValues = [
  "Select Department",
  "Applied Mechanics",
  "Bio Medical Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Engineering",
  "Electrical Engineering",
  "Electronics & Communication Engineering",
  "Environmental Engineering",
  "Information Technology",
  "Instrumentation & Control Engineering",
  "Science and Humanities",
  "Mechanical Engineering",
  "Plastic Technology",
  "Rubber Technology",
  "Textile Technology",
  "Automobile Engineering",
];

const companySchema = new mongoose.Schema(
  {
    // Company Information
    logo: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: String, required: true },
    lastDate: { type: Date, required: true },
    packageLPA: { type: Number, required: true },
    address: { type: String, required: true },

    // Eligibility Criteria
    course: { type: String, required: true, enum: courseEnumValues },
    minCPI: { type: Number, default: 0 },
    minSPI: { type: Number, default: 0 },
    departments: { type: [String], required: true, enum: departmentEnumValues },

    // Selected Students
    selectedStudents: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const companyData = mongoose.model("companyData", companySchema);

export default companyData;
