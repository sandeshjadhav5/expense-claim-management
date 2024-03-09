const express = require("express");
const expenseRouter = express.Router();
const expenseController = require("../controllers/Expense.controllers");
const multer = require("multer");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to submit a new expense
expenseRouter.post(
  "/submitexpense",
  upload.single("receipt"),
  expenseController.submitExpense
);

// Route to get all expenses
expenseRouter.get("/getallexpenses", expenseController.getAllExpenses);

// Route to get a specific expense by ID
expenseRouter.get("/getexpensebyid/:id", expenseController.getExpenseById);

// Route to update an expense (e.g., approve/reject)
expenseRouter.put("/updateexpense/:id", expenseController.updateExpense);

// Route to delete an expense
expenseRouter.delete("/deleteexpense/:id", expenseController.deleteExpense);

module.exports = expenseRouter;
