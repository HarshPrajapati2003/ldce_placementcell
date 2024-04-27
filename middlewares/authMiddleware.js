import jwt from "jsonwebtoken"
import authModel from "../models/authModel.js"

const checkIsUserAuthenticate=async(req,res,next)=>{
    let token
    const {authorization}=req.headers;
    // console.log(req.headers)
    if(authorization && authorization.startsWith("Bearer")){
        try{
            token=authorization.split(" ")[1]
            // verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET);
            // get user from token
            req.user=await authModel.findById(userID)
            next()
        }catch(err){
            return res.status(401).json({message:"unauthorized User"})
        }
    }
    else{
        return res.status(401).json({message:"unauthorized User"})
    }
}
export default checkIsUserAuthenticate