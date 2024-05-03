import express from "express";
import formController from "../controllers/formController.js";
const router = express.Router();

router.put("/:id", formController.studentRegistration);

router.get("/student-profile/:id", formController.studentProfile);
router.get("/fetch-pending", formController.fetchPendingStudents);
router.post("/fetch-pending-regex", formController.fetchPendingStudentsByRegex);
router.post("/fetch-pending-enrollment", formController.fetchPendingStudentsByEnrollment);
router.patch("/check-profile", formController.updatePendingStudentsByID);
router.get("/check-profile/:id", formController.fetchPendingStudentsByID);

export default router;
