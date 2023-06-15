import mongoose from "mongoose";

const subAccountSchema = mongoose.Schema(
  {
    accountNo: {
      type: Number,
      default: 1,
    },
    accountName: {
      type: String,
    },
    generalAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      required: true
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SubAccount = mongoose.model("subAccount", subAccountSchema);

export default SubAccount;
