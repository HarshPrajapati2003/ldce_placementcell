import companyData from "../models/companyModel.js";
import studentData from "../models/studentDataModel.js";
import { sendEmailtoUser } from "../config/EmailTemplate.js";

class companyController {
  // Company Registeration Form
  static companyRegistration = async (req, res) => {
    try {
      // Validate incoming data
      const {
        logo,
        companyName,
        location,
        email,
        description,
        position,
        lastDate,
        packageLPA,
        address,
        course,
        minCPI,
        minSPI,
        departments,
      } = req.body;

      // Check if company already exists
      const exist = await companyData.findOne({ companyName });
      const existComp = await companyData.findOne({ email });
      if (exist || existComp) {
        return res.status(400).json({ message: "Company already exists" });
      }

      // Convert minCPI and minSPI to numbers or set them to 0 if they are not present or not valid numbers
      const parsedMinCPI = minCPI ? parseFloat(minCPI) : 0;
      const parsedMinSPI = minSPI ? parseFloat(minSPI) : 0;

      // Filter eligible students
      const intPackageLPA = parseFloat(packageLPA);
      let query = {
        isVerified: "verified",
        department: { $in: departments },
        $or: [
          { placed: { $exists: false } },
          { currLPA: { $exists: false } },
          { currLPA: { $lte: intPackageLPA / 2 } },
        ],
        cpi: { $gte: parseFloat(parsedMinCPI) }, // Convert minCPI to integer
        spi: { $elemMatch: { $gte: parseFloat(parsedMinSPI) } }, // Convert minSPI to integer
      };

      if (course === "Under Graduate") {
        query.course = "Under Graduate";
      } else if (course === "Post Graduate") {
        query.course = "Post Graduate";
      } else if (course === "Both") {
        query.course = { $in: ["Under Graduate", "Post Graduate"] };
      }

      const eligibleStudents = await studentData.find(query);
      // Extract emails using map
      const emails = eligibleStudents.map((student) => student.email);

      // Join emails into a single string with commas
      const emailsString = emails.join(", ");
      console.log("eligible students : ", eligibleStudents);

      // Update company document with eligible students
      const company = new companyData(req.body);
      company.eligibleStudents = eligibleStudents;
      await company.save();

      const link = `http://localhost:5173/check-company/${company._id}`;
      const subject = "Job Alert (LDCE Placement Cell)";
      const heading = `Congratulations!, You are eligible for ${company.companyName} company`;
      const desc = `Click the button below to apply for a job at ${company.companyName} or learn more about the company. Last date to apply : ${lastDate}`;
      const button = "APPLY NOW";
      sendEmailtoUser(link, emailsString, subject, heading, desc, button,res);

      const addCompanyInStudentData = eligibleStudents.map((student) => {
        // Push the company's _id into student's eligibleCompanies array
        student.eligibleCompanies.push(company._id);
        return student;
      });

      // Save the updated students back to the database
      await Promise.all(eligibleStudents.map((student) => student.save()));

      // Return success response
      return res
        .status(201)
        .json({ message: "Company Registered Successfully", company });
    } catch (error) {
      console.error("Error in company registration:", error);
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  };

  // Get All Companies
  static getCompanies = async (req, res) => {
    try {
      const companies = await companyData.find({});
      if (companies.length > 0) {
        return res
          .status(200)
          .json({ message: "Companies fetched successfully", companies });
      } else {
        return res.status(404).json({ message: "No companies found" });
      }
    } catch (error) {
      console.error("Error fetching companies: ", error);
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  };

  // Get Company By ID
  static getCompany = async (req, res) => {
    const { id } = req.params;
    try {
      const company = await companyData
        .findById(id)
        .populate("eligibleStudents")
        .populate("applyStudents")
        .populate("selectedStudents");
      if (company) {
        return res
          .status(200)
          .json({ message: "Company fetched successfully", company });
      } else {
        return res.status(404).json({ message: "Company not found" });
      }
    } catch (error) {
      console.error("Error fetching company: ", error);
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  };

  // Search Companies by Regex
  static searchCompanies = async (req, res) => {
    try {
      const { companyNameRegex } = req.body;

      // Construct query to match companyName or description
      const query = {
        $or: [
          { companyName: { $regex: companyNameRegex, $options: "i" } }, // Case-insensitive matching for companyName
          { description: { $regex: companyNameRegex, $options: "i" } }, // Case-insensitive matching for description
        ],
      };

      // Search companies based on the constructed query
      const companies = await companyData.find(query);

      if (companies.length > 0) {
        return res
          .status(200)
          .json({ message: "Companies fetched successfully", companies });
      } else {
        return res.status(404).json({ message: "No companies found" });
      }
    } catch (error) {
      console.error("Error searching companies: ", error);
      return res
        .status(500)
        .json({ message: `Internal server error: ${error.message}` });
    }
  };
}

export default companyController;