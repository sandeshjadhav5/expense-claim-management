const express = require("express");

const {
  registerUser,
  userLogin,
  getAllUsers,
  getUserDetails,
  updateUserDetails,
  deleteUser,
  changeUserPassword,
  logoutUser,
} = require("../controllers/User.controllers");

const userRouter = express.Router();

//Register New User
userRouter.post("/register", registerUser);

//User Login
userRouter.post("/login", userLogin);

//getting all users
userRouter.get("/allusers", getAllUsers);

//getting user details
userRouter.get("/:id", getUserDetails);

//updating user details
userRouter.put("/:id", updateUserDetails);

//change user password
userRouter.patch("/:id/resetpassword", changeUserPassword);

//delete user
userRouter.delete("/:id", deleteUser);

//logout user
userRouter.post("/logoutuser", logoutUser);

module.exports = userRouter;
