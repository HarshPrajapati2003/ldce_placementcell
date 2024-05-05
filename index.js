import express from "express"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import formRoutes from "./routes/formRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
const app=express()
const PORT = process.env.PORT || 5000
connectDB()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Backend is running...")
})
// routes
app.use("/api/auth", authRoutes)
app.use("/student", formRoutes);
app.use("/company", companyRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}/`)
})