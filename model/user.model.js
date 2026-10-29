const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { required: true, type: String, minlength: 2 },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    gender: {
      enum: ["female", "male", "others"],
      required: true,
      type: String,
    },
    verificationStatus: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;
  } catch (error) {
    console.log(error);
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

