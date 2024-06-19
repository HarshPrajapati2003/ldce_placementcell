import express from "express"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import formRoutes from "./routes/formRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import path from 'path'
const app=express()
const PORT = process.env.PORT || 5000
dotenv.config();
connectDB()

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "https://res.cloudinary.com"],
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

// routes
app.use("/api/auth", authRoutes)
app.use("/student", formRoutes);
app.use("/company", companyRoutes);

// ----------------  Deployment --------------------

const __dirname1 = path.resolve();
if ((process.env.NODE_ENV === "Production")) {
  app.use(express.static(path.join(__dirname1, "/Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1,"Frontend","dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Backend is running...");
  });
}
  

// ----------------  Deployment --------------------

// ----------------  Localhost --------------------

// app.get("/", (req, res) => {
//   res.send("Backend is running...");
// });

// ----------------  Localhost --------------------

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}/`)
})