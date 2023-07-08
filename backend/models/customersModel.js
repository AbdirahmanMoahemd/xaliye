import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
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

const Customers = mongoose.model("customers", customerSchema);

export default Customers;
