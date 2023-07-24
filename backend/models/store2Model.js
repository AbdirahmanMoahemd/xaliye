import mongoose from "mongoose";

const store2Schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      require: true,
    },
    selling: {
      type: Number,
      require: true,
    },
    cost: {
      type: Number,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Store2 = mongoose.model("store2", store2Schema);

export default Store2;
