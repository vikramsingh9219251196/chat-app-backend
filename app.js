const express = require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser")

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");


//routes declaration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

module.exports=app;