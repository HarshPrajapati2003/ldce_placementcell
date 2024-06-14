import jwt from "jsonwebtoken"
import authModel from "../models/authModel.js"

// Middleware to check authentication
const isAuthenticated = async (req, res, next) => {
    // console.log("Authenticated check:", req.session.user);
    if (req.session.user) {
        const token = req.session.user.token
      // verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET);
            // get user from token
            req.user=await authModel.findById(userID)
    next();
  } else {
    res.status(401).send({ error: 'Unauthorized' });
  }
};
export default isAuthenticated;