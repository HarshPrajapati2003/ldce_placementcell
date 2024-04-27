import mongoose from "mongoose";
const studentDataSchema = new mongoose.Schema(
  {
    photo: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    adharNo: { type: String, required: true },
    PANNumber: { type: String, required: true },
    cast: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    parentsMobileNo: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    branch: { type: String, required: true },
    passingYear: { type: Number, required: true },
    enrollmentNumber: { type: String, required: true },
    tenthPercentage: { type: Number, required: true },
    hscPercentage: { type: Number, required: true },
    HSCMode: { type: String, required: true },
    cpi: { type: Number, min: 0, max: 10, required: true },
    spi: { type: Number, min: 0, max: 10, required: true },
    cgpa: { type: Number, min: 0, max: 10, required: true },
    placed: { type: String, required: true },
    currApply: { type: String, required: true },
    currLPA: { type: Number, required: true },
  },
  { timestamps: true }
);

const studentData = mongoose.model("studentData", studentDataSchema);

export default studentData;
