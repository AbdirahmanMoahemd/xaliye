import expressAsync from "express-async-handler";
import Account2 from "../models/accounts2.js";

export const getAccounts = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          accountName: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const accounts = await Account2.find({ ...keyword });

    res.json({ accounts });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getAccountById = expressAsync(async (req, res) => {
  try {
    const account = await Account2.findById(req.params.id);
    if (account) {
      res.json(account);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createAccount = expressAsync(async (req, res) => {
  const { accountName, description } = req.body;

  const exAccount = await Account2.findOne({ accountName });
  if (!exAccount) {
    const acc = await Account2.find().sort({ createdAt: -1 });

    if (acc) {
      const account = new Account2({
        accountNo: acc[0].accountNo + 1,
        accountName,
        description,
      });
      const createdAccount = await Account2.save();
      res.status(201).json(createdAccount);
    } else {
      const account = new Account2({
        accountNo: 1,
        accountName,
        description,
      });
      const createdAccount = await Account2.save();
      res.status(201).json(createdAccount);
    }
  } else {
    res.status(500).json({ message: "Already exists" });
  }
});

export const updateAccount = expressAsync(async (req, res) => {
  const { accountName, description } = req.body;

  const account = await Account2.findById(req.params.id);

  if (account) {
    Account2.accountName = accountName;
    Account2.description = description;

    const updatedAccount = await Account2.save();
    res.json({
      updatedAccount,
    });
  } else {
    res.status(404);
    throw new Error("Account Not Found");
  }
});

export const deleteAccountById = expressAsync(async (req, res) => {
  const account = await Account2.findByIdAndDelete(req.params.id);

  res.json({ message: "Account removed" });
});
