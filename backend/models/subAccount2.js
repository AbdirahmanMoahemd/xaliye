import mongoose from "mongoose";

const subAccount2Schema = mongoose.Schema(
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
      ref: "account2",
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

const SubAccount2 = mongoose.model("subAccount2", subAccount2Schema);

export default SubAccount2;
