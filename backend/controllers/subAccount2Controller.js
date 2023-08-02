import expressAsync from "express-async-handler";
import SubAccount2 from "../models/subAccount2.js";

export const getSubAccounts = expressAsync(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        accountName: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const subaccounts = await SubAccount2.find({ ...keyword }).populate(
    "generalAccount"
  );

  res.json({ subaccounts });
});

export const getSubAccountById = expressAsync(async (req, res) => {
  const subaccount = await SubAccount2.findById(req.params.id).populate(
    "generalAccount"
  );
  if (subaccount) {
    res.json(subaccount);
  }
});

export const createSubAccount = expressAsync(async (req, res) => {
  const { accountName, generalAccount, description } = req.body;

  const exSubAccount = await SubAccount2.findOne({ accountName });
  if (!exSubAccount) {
    const subacc = await SubAccount2.find().sort({ createdAt: -1 });
    if (subacc.length !==0) {
      const subaccount = new SubAccount2({
        accountNo: subacc.accountNo + 1,
        accountName,
        generalAccount: generalAccount._id,
        description,
      });
      const createdSubAccount = await subaccount.save();
      res.status(201).json(createdSubAccount);
    } else {
      const subaccount = new SubAccount2({
        accountNo: 1,
        accountName,
        generalAccount: generalAccount._id,
        description,
      });
      const createdSubAccount = await subaccount.save();
      res.status(201).json(createdSubAccount);
    }
  } else {
    res.status(500).json({ message: "Already exists" });
  }
});

export const updateSubAccount = expressAsync(async (req, res) => {
  const { accountName, generalAccount, description } = req.body;

  const subaccount = await SubAccount2.findById(req.params.id);

  if (subaccount) {
    SubAccount2.accountName = accountName;
    SubAccount2.generalAccount = generalAccount._id;
    SubAccount2.description = description;

    const updatedSubAccount = await subaccount.save();
    res.json({
      updatedSubAccount,
    });
  } else {
    res.status(404);
    throw new Error("SubAccount Not Found");
  }
});

export const deleteSubAccountById = expressAsync(async (req, res) => {
  const subaccount = await SubAccount2.findByIdAndDelete(req.params.id);

  res.json({ message: "SubAccount removed" });
});
