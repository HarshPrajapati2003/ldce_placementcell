import authModel from "../models/authModel.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { sendEmailtoUser } from "../config/EmailTemplate.js"
class authController {
  // User Registeration
  static userRegistration = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (username && email && password) {
        const exist = await authModel.findOne({ email });
        if (exist) {
          return res.status(400).json({ message: "User already exist" });
        } else {
          // hash password
          const hashPassword = await bcryptjs.hash(password, 12);

          // generate token
          const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: "60m",
          });
          const newToken = token.replace(/\./g, "DOT");
          const link = `http://localhost:5173/verifyemail/${newToken}`;
          const subject = "Email verification Request";
          const heading = "LDCE Placement cell Email verification";
          const description = "Click below button and Verify your email";
          const button = "VERIFY EMAIL";
          sendEmailtoUser(
            link,
            email,
            subject,
            heading,
            description,
            button,
            res
          );

          const user = authModel({
            username,
            email,
            password: hashPassword,
            isVerified: "false",
          });

          const result = await user.save();
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1 hour
          });
          if (result) {
            return res.status(200).json({
              message: "registration successfull",
              data: result,
              token,
            });
          }
        }
      } else {
        return res.status(400).json({ message: "please fill all the fields" });
      }
    } catch (err) {
      return res.status(400).json({ message: "no registration" });
    }
  };

  // User Login
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (password && email) {
        const exist = await authModel.findOne({ email });
        if (exist) {
          // check email is verified
          if (exist.isVerified === "true") {
            const hashPassword = await bcryptjs.compare(
              password,
              exist.password
            );
            if (email === exist.email && hashPassword) {
              // token genrate
              const token = await jwt.sign(
                { userID: exist._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );

              req.session.user = {
                _id: exist._id,
                username: exist.username,
                password: password,
                email: exist.email,
                isVerified: exist.isVerified,
                role: exist.role,
                token: token,
              };

              // res.cookie("jwt", token, {
              //   httpOnly: true,
              //   maxAge: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
              // });
              console.log("Session after login:", req.session);
              res.status(200).json({
                message: "login successfull",
                token: token,
                data: exist,
              }); //token and name save in local storage
            } else {
              res.status(400).json({ message: "invalid credential" });
            }
          } else {
            res.status(400).json({
              message: "Email Verification is pending, check your email inbox",
            });
          }
        } else {
          res.status(400).json({ message: "please register first" });
        }
      } else {
        res.status(400).json({ message: "please fill all the fields" });
      }
    } catch (err) {
      res.status(400).json({ message: "no login", error: err });
    }
  };

  //forgetPassword

  static forgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      if (email) {
        const isUser = await authModel.findOne({ email });
        if (isUser) {
          // generate token
          const token = jwt.sign(
            { userID: isUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "60m",
            }
          );

          const newToken = token.replace(/\./g, "DOT");

          const link = `http://localhost:5173/reset/${isUser._id}/${newToken}`;

          // sending email
          const subject = "Reset Password Request";
          const heading = "You have requested to reset your password";
          const description = "Click below button and change your password";
          const button = "RESET PASSWORD";
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
            message: "We sent you reset password link in your email",
            linkToken: token,
          });
        } else {
          return res.status(400).json({ message: "unknown user" });
        }
      } else {
        return res.status(400).json({ message: "Please enter email" });
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  // forgetPasswordEmail
  static forgetPasswordEmail = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const { id, token } = req.params;

    console.log(newPassword, confirmPassword, id, token);

    try {
      if (newPassword && confirmPassword && id && token) {
        if (newPassword === confirmPassword) {
          // Replace "DOT" with '.'
          const decodedToken = token.replace(/DOT/g, ".");
          // token verify
          const isValid = await jwt.verify(
            decodedToken,
            process.env.JWT_SECRET
          );
          if (isValid) {
            // password hashing
            const hashPassword = await bcryptjs.hash(newPassword, 12);
            const isUser = await authModel.findById(id);

            const isSuccess = await authModel.findOneAndUpdate(isUser._id, {
              password: hashPassword,
            });
            if (isSuccess) {
              return res
                .status(200)
                .json({ message: "password changed successfully" });
            }
          } else {
            return res.status(400).json({ message: "sorry!,link expired" });
          }
        } else {
          return res.status(400).json({ message: "password doesn't match" });
        }
      } else {
        return res.status(400).json({ message: "all fields are required" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  // SaveVerifyEmail
  static SaveVerifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
      if (token) {
        // Replace "DOT" with '.'
        const decodedToken = token.replace(/DOT/g, ".");
        // Token verify
        const isEmailVerify = await jwt.verify(
          decodedToken,
          process.env.JWT_SECRET
        );
        if (isEmailVerify) {
          const getUser = await authModel.findOne({
            email: isEmailVerify.email,
          });
          const saveEmail = await authModel.findByIdAndUpdate(getUser._id, {
            isVerified: "true",
          });
          if (saveEmail) {
            return res
              .status(200)
              .json({ message: "Email verify succesfully" });
          }
        } else {
          return res.status(400).json({ message: "Link expire" });
        }
      } else {
        return res.status(400).json({ message: "Invalid Url" });
      }
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  };

  // deleteNotification
  static deleteNotification = async (req, res) => {
    const { id, userId } = req.params;

    try {
      if (id && userId) {
        // Find the user by userId
        const user = await authModel.findById(userId);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Filter out the notification by id
        user.notification = user.notification.filter(
          (n) => n._id.toString() !== id
        );

        // Save the updated user
        await user.save();

        return res
          .status(200)
          .json({ message: "Notification deleted successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid userId or notification id" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
}
export default authController