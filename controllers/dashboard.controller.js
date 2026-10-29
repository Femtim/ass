const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { uploadImage } = require("../services/cloudinary.service");

const allUser = async (req, res) => {
  try {
    const allUser = await userModel.find();
    return res.status(200).json({ allUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to fetch users" });
  }
};

const dashboard = async (req, res) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    console.log(decoded);
    return res.status(200).json({ decoded });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const userUpload = async (req, res) => {
  try {
    await uploadImage()
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Image upload failed" });
  }
};

module.exports = { allUser, dashboard, userUpload };
