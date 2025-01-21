import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import connectDB from "./confing/mongodb.js";
import connectCloudinary from "./confing/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// app config
const app = express();
const port = process.env.PORT || 8080;
connectDB();
connectCloudinary();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log("Server Started", port);
});
