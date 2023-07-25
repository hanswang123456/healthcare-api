//general
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//routes
import authRoute from "./routes/auth.js";
import doctorRoute from "./routes/doctor.js";
import userRoute from "./routes/user.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());

app.use(express.json());

dotenv.config();

const connect = async () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("MongoDB connected");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnect", () => {
  console.log("disconnected!");
});

//middleware
app.use("/api/auth", authRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("first request");
});

app.listen(port, () => {
  connect();
  console.log("Listening on 80");
});
