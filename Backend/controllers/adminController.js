import validator from "validator";
import bcrypt from "bcrypt";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";

export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;
    console.log(req.body);
    console.log(imageFile);

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const exitedEmail = await doctorModel.findOne({ email });
    if (exitedEmail) {
      return res.json({ success: false, message: "Email arelady exited" });
    }

    // calidating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    // validating strong password
    if (password.length < 6) {
      return res.json({ success: false, message: "Password too short" });
    }

    // hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error" });
  }
};

// API for admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Verify admin credentials
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      return res.json({
        success: true,
        token,
        message: "Admin login successful.",
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.json({ success: false, message: "Internal server error." });
  }
};

// API to get all doctors list for admin panel
export const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
