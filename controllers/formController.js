import studentData from "../models/studentDataModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class formController {
  // Student Registeration Form
  static studentRegistration = async (req, res) => {
    // TODO : Unique registartion only (check using enrollment number , email)
     const { id } = req.params;
     try {
       let student;

       // Check if the student with the given ID exists
       const existingStudent = await studentData.findById(id);

       if (existingStudent) {
         // If the student exists, update the existing record
         student = existingStudent;
         // Update student data with the request body
         Object.assign(student, req.body);
       } else {
         // If the student does not exist, create a new record with the given ID
         student = new studentData(req.body);
       }

       // Save the student data
       const savedStudent = await student.save();

       return res.status(200).json({
         message: existingStudent
           ? "Student profile updated successfully"
           : "Student registered successfully",
         data: savedStudent,
       });
     } catch (error) {
       console.error("Error in student registration/update:", error);
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
        return res.status(200).json({ data :student });
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

  // Edit student Profile
  static editStudentProfile = async (req, res) => {
    try {
      const { id } = req.params;
      // Find the student by id and update
      const updatedStudent = await studentData.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // Check if student is found
      if (updatedStudent) {
        return res.status(200).json({ student: updatedStudent });
      } else {
        return res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      console.error("Error updating student profile:", error);
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };
}
export default formController;
