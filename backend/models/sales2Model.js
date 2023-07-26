import mongoose from "mongoose";

const sales2Schema = mongoose.Schema(
  {
    orderItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "store2",
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
      },
    ],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers2",
    },
    customerName: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
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
      unique: true,
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

const Sales2 = mongoose.model("sales2", sales2Schema);

export default Sales2;
