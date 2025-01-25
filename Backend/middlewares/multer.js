import multer from "multer";
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "myHospital",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

const upload = multer({ storage });

export default upload;
