import expressAsync from "express-async-handler";
import Transactions2 from "../models/transactions2.js";

export const getTransactions = expressAsync(async (req, res) => {
  try {
    const transactions = await Transactions2.find()
      .sort({ createdAt: -1 })
      .populate("Account")
      .populate("subAccount");

    res.json({ transactions });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTransactionsByDateRage = expressAsync(async (req, res) => {
  const { startDate, endDate } = req.body;
  var start = new Date(startDate);
  start.setDate(start.getDate());
  start.toDateString();

  var end = new Date(endDate);
  end.setDate(end.getDate() +1);
  end.toDateString();

  const transactions = await Transactions2.find({
    date: { $lte: end, $gt: start },
  })
    .sort({ createdAt: -1 })
    .populate("Account")
    .populate("subAccount");

  res.json({ transactions });
});

export const getTransactionById = expressAsync(async (req, res) => {
  try {
    const transaction = await Transactions2.findById(req.params.id)
      .populate("Account")
      .populate("SubAccount");
    if (transaction) {
      res.json(transaction);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createTransaction = expressAsync(async (req, res) => {
  const { Account, subAccount, Amount, date, ref } = req.body;

  const transaction = new Transactions2({
    Account: Account._id,
    subAccount: subAccount._id,
    Amount,
    date,
    ref,
  });
  const createdTransactions = await transaction.save();
  res.status(201).json(createdTransactions);
});

export const updateTransactions = expressAsync(async (req, res) => {
  const { Account, subAccount, Amount, date, ref } = req.body;

  const transaction = await Transactions2.findById(req.params.id);

  if (transaction) {
    transaction.Account = Account;
    transaction.subAccount = subAccount;
    transaction.Amount = Amount;
    transaction.date = date;
    transaction.ref = ref;

    const updatedTransaction = await transaction.save();
    res.json({
      updatedTransaction,
    });
  } else {
    res.status(404);
    throw new Error("Transaction Not Found");
  }
});

export const deleteTransactionsById = expressAsync(async (req, res) => {
  const transaction = await Transactions2.findByIdAndDelete(req.params.id);

  res.json({ message: "transaction removed" });
});
