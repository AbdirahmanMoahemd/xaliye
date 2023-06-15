import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    accountNo: {
      type: Number,
    },
    accountName: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("account", accountSchema);

export default Account;
