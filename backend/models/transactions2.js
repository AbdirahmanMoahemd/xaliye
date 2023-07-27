import mongoose from "mongoose";

const transactions2Schema = mongoose.Schema(
  {
    Account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true
    },
    subAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subAccount",
      required: true
    },
    Amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    ref: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Transactions2 = mongoose.model("transactions2", transactions2Schema);

export default Transactions2;
