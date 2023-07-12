import mongoose from "mongoose";

const salesSchema = mongoose.Schema(
  {
    orderItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "store",
        },
        itemName: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      }
    ],
    customer: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default:0.0
  },
    phone: {
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
