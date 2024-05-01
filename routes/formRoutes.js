import express from "express";
import formController from "../controllers/formController.js";
const router = express.Router();

router.put("/:id", formController.studentRegistration);

router.get("/student-profile/:id", formController.studentProfile);
router.patch("/edit-profile/:id", formController.editStudentProfile);

export default router;
