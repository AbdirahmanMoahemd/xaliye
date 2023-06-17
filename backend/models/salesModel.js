import mongoose from "mongoose";

const salesSchema = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    itemName: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
    },
    invoiceId: {
      type: Number,
      unique:true,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("sales", salesSchema);

export default Sales;
