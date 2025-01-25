import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

// Cloudinary configuration
const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
    console.log("Cloudinary Connected");
  } catch (error) {
    console.error("Failed to connect to Cloudinary:", error);
  }
};

export default connectCloudinary;
