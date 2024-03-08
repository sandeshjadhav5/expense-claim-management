const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.secretKey);
    if (decoded) {
      const userID = decoded.userID;
      const user = await UserModel.findById(userID);
      req.user = user;
      next();
    } else {
      res.status(401).send("Invalid Token");
    }
  } else {
    res.status(401).send("Please Login");
  }
};

module.exports = { authenticate };
