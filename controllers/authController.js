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
                // const link = `http://localhost:5000/api/auth/verify/${token}`
                  const link = `http://localhost:3000/verify/${token}`;
                  const subject = "Email verification Request";
                  const heading = "LDCE Placement cell Email verification";
                  const description = "Click below button and Verify your email"
                  const button = "VERIFY EMAIL"
                sendEmailtoUser(link, email, subject, heading, description,button);

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
              return res
                .status(400)
                .json({ message: "please fill all the fields" });
            }

        } catch (err) {
            return res.status(400).json({ message: "no registration" })
        }
    }

    // User Login
    static userLogin = async(req,res)=>{
        try{
            const{email,password}=req.body
            if(password && email){
                const exist = await authModel.findOne({email})
                if(exist){
                    // check email is verified
                    if(exist.isVerified==="true"){
                        const hashPassword = await bcryptjs.compare(password,exist.password)
                        if(email===exist.email && hashPassword){
                            // token genrate
                            const token = await jwt.sign({ userID: exist._id }, process.env.JWT_SECRET, { expiresIn: "2d" })
                            res.cookie("jwt", token, {
                              httpOnly: true,
                              maxAge: 60 * 60 * 1000, // 1 hour
                            });
                            res.status(200).json({
                              message: "login successfull",
                              token: token,
                              user: exist,
                            }); //token and name save in local storage
                        }else{
                            res.status(400).json({ message: "invalid credential"})
                        }
                    }else{
                        res.status(400).json({ message: "Email Verification is pending"})
                    }
                }
                else{
                    res.status(400).json({ message: "please register first"})
                }
            }
            else{
                res.status(400).json({ message: "please fill all the fields"})
            }
        }catch(err){
            res.status(400).json({ message: "no login", error:err })
        }
    }

    // change password
    static changePassword = async(req,res)=>{
        const {newpassword,confirmpassword}=req.body
        try{
            if(newpassword && confirmpassword){
                if(newpassword === confirmpassword){
                    const hashpassword = await bcryptjs.hash(newpassword,12)
                    await authModel.findByIdAndUpdate(req.user._id,{password:hashpassword}) //req.user is blongs to authMiddleware file
                    res.status(200).json({ message: "password changed successfully"})
                }else{
                    res.status(400).json({ message: "password doesn't match"})
                }
            }else{
                res.status(400).json({ message: "please fill all the fields"})
            }
        }catch(err){
            res.status(400).json({ message: err.message })
        }
    }

    //forgetPassword
    
    static forgetPassword=async(req,res)=>{
        const{email}=req.body
        try{
            if(email){
                const isUser = await authModel.findOne({email})
                if(isUser){
                    // generate token
                    const token = jwt.sign({userID:isUser._id},"thisismyseceretkey",{expiresIn:"60m"})
                   
                    const link = `http://localhost:3000/user/reset/${isUser._id}/${token}`
                    
                    // sending email
                    const subject = "Reset Password Request";
                    const heading = "You have requested to reset your password";
                    const description = "Click below button and change your password"
                    const button = "RESET PASSWORD";
                    sendEmailtoUser(link, email, subject, heading, description,button);
                    return res.status(200).json({
                      message:
                        "We sent you reset password link in your registered email",
                      linkToken: token,
                    });
                }else{
                    return res.status(400).json({message:"unknown user"})
                }
            }else{
                return res.status(400).json({message:"Please enter email"})
            }
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    // forgetPasswordEmail
    static forgetPasswordEmail =async(req,res)=>{
        const{newPassword,confirmPassword}=req.body
        const{id,token}=req.params
        
        try{
            if(newPassword && confirmPassword && id && token){
                if(newPassword===confirmPassword){
                    // token verify
                    
                    const isValid=await jwt.verify(token,"thisismyseceretkey")
                    if(isValid){
                        // password hashing
                        const hashPassword = await bcryptjs.hash(newPassword,12)
                        const isUser = await authModel.findById(id)
                        
                        const isSuccess = await authModel.findOneAndUpdate(isUser._id,{password:hashPassword})
                       if(isSuccess){
                        return res.status(200).json({message:"password changed successfully"})
                       }
                    }else{
                        return res.status(400).json({message:"sorry!,link expired"})
                    }
                }else{
                    return res.status(400).json({message:"password doesn't match"})
                }
            }else{
                return res.status(400).json({message:"all fields are required"})
            }
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }

    // SaveVerifyEmail
    static SaveVerifyEmail = async(req,res)=>{
        const {token} = req.params
        try{
            if(token){
                // token verify
                const isEmailVerify = await jwt.verify(token, process.env.JWT_SECRET);
                if(isEmailVerify){
                    const getUser = await authModel.findOne({email:isEmailVerify.email})
                    const saveEmail = await authModel.findByIdAndUpdate(getUser._id,{isVerified:"true"}) 
                    if(saveEmail){
                        return res.status(200).json({message:"Email verify succesfully"})
                    }
                }else{
                    return res.status(400).json({message:"Link expire"})
                }
            }else{
                return res.status(400).json({message:"Invalid Url"})
            }
        }catch(err){
            return res.status(400).json({message:err.message})
        }
    }
}
export default authController