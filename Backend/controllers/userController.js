import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API to register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // check email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }

    // validating storng password
    if (password.length < 8) {
      return res.json({ success: false, message: "entera storng password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.find({ _id: userId }).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
export const updateProfile = async (req, res) => {
  try {
    const { userId, name, number, address, dob, gender } = req.body;
    const imageFile = req.file;

    // Validate required fields
    if (
      !userId ||
      !name ||
      !address ||
      !number ||
      !dob ||
      !gender ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing required fields." });
    }

    const updateData = {
      name,
      number,
      address: JSON.parse(address),
      dob,
      gender,
    };

    // image is uploaded,
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    updateData.image = imageUpload.secure_url;

    // Update the user profile in a single query
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    // Check if user exists and was updated
    if (!updatedUser) {
      return res.json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, sloteTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    // checking for slot availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(sloteTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(sloteTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(sloteTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      sloteTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
