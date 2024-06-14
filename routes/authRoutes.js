import express from "express";
import authController from "../controllers/authController.js";
import checkIsUserAuthenticate from "../middlewares/authMiddleware.js";
import isAuthenticated from "../middlewares/authMiddleware.js";
const router = express.Router()

router.post("/users/register",authController.userRegistration)
router.post("/users/login",authController.userLogin)

// Forget password
router.post("/forget-password",authController.forgetPassword)
router.post("/forget-password/:id/:token",authController.forgetPasswordEmail)

// Email verification
router.get("/verify/:token", authController.SaveVerifyEmail)

// Delete Notification
router.delete("/notifications/:userId/:id", authController.deleteNotification);

// Protected route
router.get('/home', isAuthenticated, (req, res) => {
  res.send({ message: 'Welcome to the home page', user: req.session.user });
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ error: "Logout failed" });
    }

    // Clear the cookie by setting it to a past date
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax", // Adjust as needed ('strict', 'lax', 'none')
    });

    res.send({ message: "User logged out" });
  });
});


export default router