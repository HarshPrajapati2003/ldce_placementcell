import express from "express";
import authController from "../controllers/authController.js";
import checkIsUserAuthenticate from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post("/users/register",authController.userRegistration)
router.post("/users/login",authController.userLogin)

// Forget password
router.post("/forget-password",authController.forgetPassword)
router.post("/forget-password/:id/:token",authController.forgetPasswordEmail)

// Email verification

router.get("/verify/:token",authController.SaveVerifyEmail)

// protected routes
router.post("/change-password",checkIsUserAuthenticate,authController.changePassword)
export default router