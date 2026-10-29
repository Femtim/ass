const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../services/verificationmail.service");

const register = async (req, res) => {
  console.log(req.body);

  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    console.log(savedUser);

    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${jwt.sign(
      { userId: savedUser._id },
      process.env.jwt_secret,
      { expiresIn: "1h" }
    )}`;

    await sendVerificationEmail({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      verificationUrl,
    });

    console.log(savedUser);
    return res.status(201).json({ message: "registration successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Registration failed or verification email could not be sent",
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "Move Bro" });
    }

    const verify = await bcrypt.compare(req.body.password, user.password);

    if (!verify) {
      return res.status(401).json({ message: "You are an Alien" });
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.jwt_secret, { expiresIn: "2min" });
    return res.status(200).json({ message: "Welcome", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { register, login };
