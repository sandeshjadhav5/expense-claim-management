const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is Already Registered");
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    res.status(200).send({
      message: "Registration Successful",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// LOGIN
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send("Login Failed");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send("Wrong Credentials");
    }

    const token = generateToken(user._id);
    setAuthCookies(res, token, user._id);

    res.status(201).send({
      message: "Login Successful",
      token,
      userId: user._id,
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ userID: userId }, process.env.secretKey, {
    expiresIn: "1d",
  });
};

// Set authentication cookies
const setAuthCookies = (res, token, userId) => {
  res.cookie("token", token, { maxAge: 86400000, httpOnly: true });
  res.cookie("userId", userId, { maxAge: 86400000, httpOnly: true });
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// GET SINGLE USER DETAILS
const getUserDetails = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// UPDATE USER DETAILS
const updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).send("User Not Found");
    }
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// RESET USER PASSWORD
const changeUserPassword = async (req, res) => {
  const id = req.params.id;
  const { password, newPassword, confirmNewPassword } = req.body;
  const user = await UserModel.findById(id);

  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      try {
        const saltRounds = 8;

        if (newPassword === confirmNewPassword) {
          const hash = await bcrypt.hash(newPassword, saltRounds);
          user.password = hash;
          await user.save();
          res.status(200).send({ message: "Password Changed Successfully" });
        } else {
          res.status(400).send({
            message: "New Password and Confirm Password Don't Match",
          });
        }
      } catch (err) {
        res
          .status(401)
          .send({ message: "Something Went Wrong", err: err.message });
      }
    } else {
      res
        .status(401)
        .send({ message: "Old Password Error", error: "Wrong Password" });
    }
  } else {
    res
      .status(401)
      .send({ message: "User does not exist. Please register first" });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).send("User Not Found");
    }
    res.send("Account Deleted Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

//LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("userId");
    res.status(200).send("Logged Out Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerUser,
  userLogin,
  getAllUsers,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  changeUserPassword,
  logoutUser,
};
