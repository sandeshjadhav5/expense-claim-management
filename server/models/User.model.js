const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Employee", "Manager"],
      default: "Employee",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
