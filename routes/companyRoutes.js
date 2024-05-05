import express from "express";
import companyController from "../controllers/companyController.js";
const router = express.Router();


router.post("/registration", companyController.companyRegistration);
router.get("/fetch-companies", companyController.getCompanies);
router.get("/fetch-company/:id", companyController.getCompany);
router.post("/search", companyController.searchCompanies);

export default router;