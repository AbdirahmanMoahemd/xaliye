import mongoose from "mongoose";

const eventsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    event: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Events = mongoose.model("events", eventsSchema);

export default Events;
