import expressAsync from "express-async-handler";
import Account from "../models/accounts.js";

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
    const accounts = await Account.find({ ...keyword });

    res.json({ accounts });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getAccountById = expressAsync(async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (account) {
      res.json(account);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createAccount = expressAsync(async (req, res) => {
  const { accountName, description } = req.body;

  const exAccount = await Account.findOne({ accountName });
  if (!exAccount) {
    const acc = await Account.find().sort({ createdAt: -1 });

    if (acc) {
      const account = new Account({
        accountNo: acc[0].accountNo + 1,
        accountName,
        description,
      });
      const createdAccount = await account.save();
      res.status(201).json(createdAccount);
    } else {
      const account = new Account({
        accountNo: 1,
        accountName,
        description,
      });
      const createdAccount = await account.save();
      res.status(201).json(createdAccount);
    }
  } else {
    res.status(500).json({ message: "Already exists" });
  }
});

export const updateAccount = expressAsync(async (req, res) => {
  const { accountName, description } = req.body;

  const account = await Account.findById(req.params.id);

  if (account) {
    account.accountName = accountName;
    account.description = description;

    const updatedAccount = await account.save();
    res.json({
      updatedAccount,
    });
  } else {
    res.status(404);
    throw new Error("Account Not Found");
  }
});

export const deleteAccountById = expressAsync(async (req, res) => {
  const account = await Account.findByIdAndDelete(req.params.id);

  res.json({ message: "Account removed" });
});
