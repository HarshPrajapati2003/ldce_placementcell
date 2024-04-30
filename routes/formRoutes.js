import express from "express";
import formController from "../controllers/formController.js";
const router = express.Router();

router.post("/", formController.studentRegistration);

router.get("/student-profile/:id", formController.studentProfile);

export default router;
