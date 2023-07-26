import mongoose from "mongoose";

const customer2Schema = mongoose.Schema(
  {
    custID: {
      type: Number,
      default: 1,
      unique: true,
    },
    name: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

const Customers2 = mongoose.model("customers2", customer2Schema);

export default Customers2;
