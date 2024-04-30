import mongoose from "mongoose";

const castEnumValues = ["General", "SEBC", "SC", "ST", "EWS"];
const courseEnumValues = ["Under Graduate", "Post Graduate"];
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

const studentDataSchema = new mongoose.Schema(
  {
    // General Information
    photo: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    adharNo: { type: Number, required: true },
    PANNumber: { type: String, required: true },
    mobileNo: { type: Number, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    cast: { type: String, required: true, enum: castEnumValues },

    // Parents Information
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    parentsMobileNo: { type: Number, required: true },

    // Residential Information
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: Number, required: true },

    // Academic Information
    course: { type: String, required: true, enum: courseEnumValues },
    department: { type: String, required: true, enum: departmentEnumValues },
    passingYear: { type: Number, required: true, min: 1947, max: 2090 },
    enrollmentNumber: { type: Number, required: true },
    sscPercentage: { type: Number, required: true },
    HSCMode: { type: String, required: true },
    hscPercentage: { type: Number, required: true },
    spi: { type: [Number], min: 0, max: 10, required: true },
    cpi: { type: Number, min: 0, max: 10, required: true },
    cgpa: { type: Number, min: 0, max: 10, required: true },
    placed: { type: String },
    currApply: { type: String },
    currLPA: { type: Number },
    isVerified: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

const studentData = mongoose.model("studentData", studentDataSchema);

export default studentData;
