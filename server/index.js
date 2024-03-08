const express = require("express");
const cookieParser = require("cookie-parser");
const { connection } = require("./configs/db");
const { authenticate } = require("./middlewares/Authenticate.middleware");
const userRouter = require("./routes/User.routes");

const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/api/v1", (req, res) => {
  res.send("Welcome to Expense Claim Management Webapp");
});

app.use("/api/v1/users", userRouter);
app.use(authenticate);

//start the server
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`listening at port : ${process.env.port}`);
});
