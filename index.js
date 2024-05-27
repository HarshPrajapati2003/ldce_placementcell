import express from "express"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import formRoutes from "./routes/formRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore  from "connect-mongo"
const app=express()
const PORT = process.env.PORT || 5000
dotenv.config();
connectDB()

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials
  })
);
app.use(express.json())
app.use(cookieParser());

// Session configuration
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

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