const { ExpenseModel } = require("../models/Expense.model");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller to submit a new expense
exports.submitExpense = async (req, res) => {
  try {
    const { employee, date, category, description, amount } = req.body;
    let receipt = "";

    // Check if file was uploaded
    if (req.file) {
      receipt = req.file.buffer.toString("base64");
    }

    const newExpense = new ExpenseModel({
      employee,
      date,
      category,
      description,
      amount,
      receipt,
    });

    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense submitted successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all expenses of an employee
exports.getAllExpensesByEmployee = async (req, res) => {
  try {
    const employeeId = req.params.userId;
    const expenses = await ExpenseModel.find({ employee: employeeId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a specific expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await ExpenseModel.find({ employee: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update an expense (e.g., approve/reject)
exports.updateExpense = async (req, res) => {
  try {
    const { status } = req.body;
    const expense = await ExpenseModel.findOne({ employee: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    expense.status = status;
    await expense.save();
    res.status(200).json({ message: "Expense updated successfully", expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
