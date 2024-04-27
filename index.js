import express from "express"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
import dotenv from "dotenv"
const app=express()
const PORT = process.env.PORT || 5000
connectDB()

dotenv.config()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Backend is running...")
})
// routes
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}/`)
})