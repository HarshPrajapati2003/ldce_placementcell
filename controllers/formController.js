import studentData from "../models/studentDataModel.js";
import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";
import { sendEmailtoUser } from "../config/EmailTemplate.js";
import companyData from "../models/companyModel.js";
import authModel from "../models/authModel.js";
import { loadImage, createCanvas } from "canvas";

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
        const link = `https://ldce-placementcell.onrender.com/student-profile`;
        const subject = `Your varification status : ${student.isVerified}`;
        const heading = `Your LDCE Placement cell registration verification status is : ${student.isVerified}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        const notification = await authModel.findByIdAndUpdate(
          id,
          {
            $push: {
              notification: {
                title: `Your LDCE Placement cell Application verification status is: ${student.isVerified}`,
                date: Date.now(),
              },
            },
          },
          { new: true } // This option returns the updated document
        );
        console.log("Notification updated:", notification);

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
        const link = `https://ldce-placementcell.onrender.com/student-profile`;
        const subject = `Your varification status : ${student.isVerified}`;
        const heading = `Your LDCE Placement cell registration verification status is : ${student.isVerified}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        if (
          student.isVerified === "verified" ||
          student.isVerified === "reject"
        ) {
          const notification = await authModel.findByIdAndUpdate(
            id,
            {
              $push: {
                notification: {
                  title: `Your LDCE Placement cell Application verification status is: ${student.isVerified}`,
                  date: Date.now(),
                },
              },
            },
            { new: true } // This option returns the updated document
          );
          console.log("Notification updated:", notification);

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
        const link = `https://ldce-placementcell.onrender.com/check-company/${companyId}`;
        const subject = `Finally Placed! (LDCE Placement Cell)`;
        const heading = `Congratulations! ${student.firstName} ${student.lastName}, You are placed at : ${student.placed}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        const notification = await authModel.findByIdAndUpdate(
          student._id,
          {
            $push: {
              notification: {
                title: `Congratulations! ${student.firstName} ${student.lastName}, You are placed at : ${student.placed}`,
                date: Date.now(),
              },
            },
          },
          { new: true } // This option returns the updated document
        );
        console.log("Notification updated:", notification);
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
        const link = `https://ldce-placementcell.onrender.com/check-company/${companyId}`;
        const subject = `Sorry, You're Rejected (LDCE Placement Cell)`;
        const heading = `Sorry, ${tempStudent.firstName} ${tempStudent.lastName}, You are rejected for the job at : ${companyName}`;
        const description = "Click below button to see your updated profile";
        const button = "SEE PROFILE";
        const notification = await authModel.findByIdAndUpdate(
          tempStudent._id,
          {
            $push: {
              notification: {
                title: `Sorry, ${tempStudent.firstName} ${tempStudent.lastName}, You are rejected for the job at : ${companyName}`,
                date: Date.now(),
              },
            },
          },
          { new: true } // This option returns the updated document
        );
        console.log("Notification updated:", notification);
        sendEmailtoUser(
          link,
          email,
          subject,
          heading,
          description,
          button,
          res
        );

        return res.status(200).json({
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

  // Generate Student Profile PDF
  static generatePDF = async (req, res) => {
    try {
      const formData = req.body;

      const General_Information = {
        "First Name": formData.firstName,
        "Middle Name": formData.middleName,
        "Last Name": formData.lastName,
        "Aadhar Number": formData.adharNo,
        "PAN Number": formData.PANNumber,
        "Mobile Number": formData.mobileNo,
        "Email Address": formData.email,
        "Date Of Birth": new Date(formData.dob).toLocaleDateString("en-IN"),
        "Cast Name": formData.cast,
      };

      const Parents_Information = {
        "Father Name": formData.fatherName,
        "Mother Name": formData.motherName,
        "Parents Mobile Number": formData.parentsMobileNo,
      };

      const Residential_Information = {
        Address: formData.address,
        "State Name": formData.state,
        "City Name": formData.city,
        "Pincode Number": formData.pincode,
      };

      const Academic_Information = {
        "Course Name": formData.course,
        "Department Name": formData.department,
        "Passing Year": formData.passingYear,
        "Enrollment Number": formData.enrollmentNumber,
        "HSC Grade": formData.hscPercentage,
        "All Sem SPI": formData.spi.join(", "),
        CPI: formData.cpi,
        CGPA: formData.cgpa,
        "Verification Status": formData.isVerified,
      };

      const doc = new jsPDF();

      // Add company logo
      const logoUrl =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlvIsNI8hPIhXz7Xvy46Tw8m75jzJkZPwaLABiZu1vww&s"; // Replace with your company logo URL
      const logoImage = await loadImage(logoUrl);
      const canvas = createCanvas(40, 20);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(logoImage, 0, 0, 40, 20);
      const logoDataUrl = canvas.toDataURL("image/png");
      doc.addImage(logoDataUrl, "PNG", 10, 10, 40, 20);

      // Add LDCE Placement Cell Registration Form heading
      doc.setFontSize(22);
      doc.setTextColor("#3C50E0");
      doc.text("LDCE Placement Cell Registration Form", 60, 20); // Adjust x-position

      // Add user photo
      const photoUrl = formData.photo;
      if (photoUrl) {
        const userPhoto = await loadImage(photoUrl);
        const imageWidth = 40; // Width of the image
        const pdfWidth = doc.internal.pageSize.getWidth(); // Width of the PDF
        const xPos = (pdfWidth - imageWidth) / 2; // Calculate x-position for center
        const photoCanvas = createCanvas(imageWidth, 40);
        const photoCtx = photoCanvas.getContext("2d");
        photoCtx.drawImage(userPhoto, 0, 0, imageWidth, 40);
        const photoDataUrl = photoCanvas.toDataURL("image/jpeg");
        doc.addImage(photoDataUrl, "JPEG", xPos, 40, imageWidth, 40); // Adjust size as needed
      }

      const addSection = (sectionTitle, sectionData, yPos) => {
        doc.setFillColor("#3C50E0");
        doc.setDrawColor("#3C50E0");
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#FFFFFF");
        doc.setFontSize(14);
        doc.rect(10, yPos, 190, 10, "F");
        doc.text(sectionTitle, 15, yPos + 7);

        doc.setLineWidth(0.5);
        doc.setDrawColor("#3C50E0");
        const sectionHeight = calculateSectionHeight(sectionData);
        if (yPos + sectionHeight + 20 > doc.internal.pageSize.height) {
          doc.addPage();
          yPos = 20;
        } else {
          yPos += 10;
        }
        doc.rect(10, yPos, 190, sectionHeight + 2);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor("#000000");

        const fields = Object.entries(sectionData);
        const maxLength = Math.max(...fields.map(([key]) => key.length));
        const xOffset = 15 + maxLength * 2 + 7;
        fields.forEach(([key, value]) => {
          doc.text(`${key}:`, 15, yPos + 10);
          doc.text(value.toString(), xOffset, yPos + 10);
          yPos += 10;
        });

        return yPos;
      };

      const calculateSectionHeight = (sectionData) => {
        const fields = Object.entries(sectionData);
        const fieldHeight = 10;
        return fields.length * fieldHeight;
      };

      let yPos = 90;

      yPos = addSection("General Information", General_Information, yPos);
      yPos += 10;
      yPos = addSection("Parents Information", Parents_Information, yPos);
      yPos += 10;
      yPos = addSection(
        "Residential Information",
        Residential_Information,
        yPos
      );
      yPos += 10;
      yPos = addSection("Academic Information", Academic_Information, yPos);
      yPos += 10;

      const __dirname = path.resolve();
      const directoryPath = path.join(__dirname, "pdfs");
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }
      const filePath = path.join(directoryPath, "registration_form.pdf");
      console.log("Saving PDF to:", filePath);
      doc.save(filePath);

      res.download(filePath, "registration_form.pdf", (err) => {
        if (err) {
          console.error("Error while downloading the file:", err);
          res.status(500).send("Error downloading file.");
        } else {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting the file:", unlinkErr);
            }
          });
        }
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      res.status(500).send("Error generating PDF.");
    }
  };
};

export default formController;
