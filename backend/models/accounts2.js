import mongoose from "mongoose";

const account2Schema = mongoose.Schema(
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

const Account2 = mongoose.model("account2", account2Schema);

export default Account2;
