import mongoose from "mongoose";    
const { Schema } = mongoose;
const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: String,
      default: "false",
    },
    role: { type: String, required: true, default: "student" },
    department: { type: String },
    // studentData: {},
    // SData:{type:Schema.Types.ObjectId,ref:"studentData"}
    notification: [
      {
        title: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const authModel = mongoose.model('user',authSchema)

export default authModel