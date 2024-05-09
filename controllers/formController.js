import studentData from "../models/studentDataModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailtoUser } from "../config/EmailTemplate.js";
import companyData from "../models/companyModel.js";

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
        return res.status(200).json({ data: student });
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

  // Fetch Pending Students Profile
  static fetchPendingStudents = async (req, res) => {
    try {
      // Find all students where isVerified is "pending"
      const pendingStudents = await studentData.find({ isVerified: "pending" });
      // Check if any pending students are found
      if (pendingStudents.length > 0) {
        return res.status(200).json({ students: pendingStudents });
      } else {
        return res.status(404).json({ message: "No pending students found" });
      }
    } catch (error) {
      console.error("Error fetching pending students:", error);
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };

  // Fetch Pending Students Profile By Regex
  static fetchPendingStudentsByRegex = async (req, res) => {
    try {
      const { findStr } = req.body;

      // Construct a regular expression from the input findStr
      const regex = new RegExp(findStr, "i"); // 'i' for case-insensitive search

      // Find pending students that match the regex pattern
      const pendingStudents = await studentData
        .find({
          isVerified: "pending", // Only search for pending students
          $or: [
            { firstName: { $regex: regex } },
            { middleName: { $regex: regex } },
            { lastName: { $regex: regex } },
            { PANNumber: { $regex: regex } },
            { email: { $regex: regex } },
            { cast: { $regex: regex } },
            { fatherName: { $regex: regex } },
            { motherName: { $regex: regex } },
            { address: { $regex: regex } },
            { state: { $regex: regex } },
            { city: { $regex: regex } },
            { course: { $regex: regex } },
            { department: { $regex: regex } },
            { HSCMode: { $regex: regex } },
          ],
        })
        .exec();

      return res.status(200).json({ pendingStudents });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };

  // Fetch Pending Students Profile By Enrollment Number
  static fetchPendingStudentsByEnrollment = async (req, res) => {
    try {
      const { enrollmentNumber } = req.body;

      // Query for pending students by enrollment number
      const pendingStudents = await studentData.find({
        enrollmentNumber: enrollmentNumber,
        isVerified: "pending",
      });

      return res.status(200).json({ pendingStudents });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };

  // Update Pending Students Profile By ID
  static updatePendingStudentsByID = async (req, res) => {
    try {
      const { id, isVerified } = req.body;

      const student = await studentData.findByIdAndUpdate(
        id,
        { isVerified },
        { new: true }
      );
      if (student) {
        const email = student.email;
        const link = `http://localhost:5173/student-profile`;
        const subject = `Your varification status : ${student.isVerified}`;
        const heading = `Your LDCE Placement cell registration verification status is : ${student.isVerified}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        sendEmailtoUser(
          link,
          email,
          subject,
          heading,
          description,
          button,
          res
        );
        return res
          .status(200)
          .json({ message: "Status Updated Successfully", student });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };

  // Fetch Pending Students Profile By ID
  static fetchPendingStudentsByID = async (req, res) => {
    try {
      const { id } = req.params;

      const student = await studentData.findById(id);
      if (student) {
        const email = student.email;
        const link = `http://localhost:5173/student-profile`;
        const subject = `Your varification status : ${student.isVerified}`;
        const heading = `Your LDCE Placement cell registration verification status is : ${student.isVerified}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        if (
          student.isVerified === "verified" ||
          student.isVerified === "reject"
        ) {
          sendEmailtoUser(
            link,
            email,
            subject,
            heading,
            description,
            button,
            res
          );
        }
        return res.status(200).json({ message: "Status Data Found", student });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };

  // Apply For A Job
  static ApplyForJob = async (req, res) => {
    try {
      const { studentId, resume, companyId } = req.body;

      // Validate input
      if (!studentId || !resume || !companyId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Check if student already applied for this job
      const company = await companyData.findById(companyId);
      if (company.applyStudents.includes(studentId)) {
        return res
          .status(400)
          .json({ message: "You are already applied for this job" });
      }

      // Update company data
      const updatedCompany = await companyData.findByIdAndUpdate(
        companyId,
        { $push: { applyStudents: studentId } },
        { new: true }
      );

      // Update student data
      const updatedStudent = await studentData.findByIdAndUpdate(
        studentId,
        { resume },
        { new: true }
      );

      // Check if both updates were successful
      if (!updatedCompany || !updatedStudent) {
        return res.status(500).json({ message: "Failed to apply for the job" });
      }

      return res.status(200).json({
        message: "Applied for the job successfully",
        company: updatedCompany,
        student: updatedStudent,
      });
    } catch (error) {
      console.error("Error applying for job:", error);
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };

  // Update student's data (student selection process)
  static studentSelection = async (req, res) => {
    try {
      const { studentId, companyId, companyName, currLPA, status } = req.body;

      // Validate inputs
      if (!studentId || !companyId || !companyName || !currLPA || !status) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const tempStudent = await studentData.findById(studentId);
      if (!tempStudent) {
        return res.status(404).json({ message: "Student not found." });
      }

      if (status === "Select") {
        const student = await studentData.findByIdAndUpdate(
          studentId,
          {
            currLPA,
            placed: companyName,
            currApply: companyId,
          },
          { new: true }
        );

        if (!student) {
          return res.status(404).json({ message: "Student not found." });
        }

        const company = await companyData.findByIdAndUpdate(
          companyId,
          {
            $push: { selectedStudents: studentId },
          },
          { new: true }
        );

        if (!company) {
          return res.status(404).json({ message: "Company not found." });
        }

        // Send placement email
        const email = student.email;
        const link = `http://localhost:5173/check-company/${companyId}`;
        const subject = `Finally Placed! (LDCE Placement Cell)`;
        const heading = `Congratulations! ${student.firstName} ${student.lastName}, You are placed at : ${student.placed}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        sendEmailtoUser(
          link,
          email,
          subject,
          heading,
          description,
          button,
          res
        );
        return res
          .status(200)
          .json({ message: "Student Placed Successfully!", student });
        
      } else if (status === "Reject") {
        // Send rejection email
        const email = tempStudent.email;
        const link = `http://localhost:5173/check-company/${companyId}`;
        const subject = `Sorry, You're Rejected (LDCE Placement Cell)`;
        const heading = `Sorry, ${tempStudent.firstName} ${tempStudent.lastName}, You are rejected for the job at : ${companyName}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        sendEmailtoUser(
          link,
          email,
          subject,
          heading,
          description,
          button,
          res
        );

        return res
          .status(200)
          .json({
            message: "Student Rejected Successfully!",
            student: tempStudent,
          });
      } else {
        return res.status(400).json({ message: "Invalid status." });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Internal server error ${error.message}` });
    }
  };
};

export default formController;
