const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Travel", "Supplies", "Other"],
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    receipt: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
const ExpenseModel = mongoose.model("expense", expenseSchema);

module.exports = { ExpenseModel };
