import companyData from "../models/companyModel.js";
import { sendEmailtoUser } from "../config/EmailTemplate.js";

class companyController {
  // Company Registeration Form
  static companyRegistration = async (req, res) => {
    try {
      // Validate incoming data
      const { companyName, email } = req.body;

      // Check if company already exists
      const exist = await companyData.findOne({ companyName });
      const existComp = await companyData.findOne({ email });
      if (exist || existComp) {
        return res.status(400).json({ message: "Company already exists" });
      }

      // Create new company document
      const company = new companyData(req.body);
      await company.save();

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
      const company = await companyData.findById(id);
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