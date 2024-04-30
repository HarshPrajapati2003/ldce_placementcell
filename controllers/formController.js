import studentData from "../models/studentDataModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class formController {
  // Student Registeration Form
  static studentRegistration = async (req, res) => {
    // TODO : Unique registartion only (check using enrollment number , email)
    
    try {
      const newStudent = new studentData(req.body);
      const isSave = await newStudent.save();
      if (isSave) {
        return res.status(201).json({
          message: "Student registered successfully",
          data: newStudent,
        });
      }
    } catch (error) {
      console.error("Error in student registration:", error);
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };

  // Get student Profile
  static studentProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await studentData.findById(id);
      // Check if student is found
      if (student) {
        return res.status(200).json({ student });
      } else {
        return res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };
}
export default formController;
