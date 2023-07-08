import mongoose from "mongoose";

const tasksSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
    custID: {
      type: Number,
      required: true,
      default:1
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    }, 
    phone: {
      type: Number,
      required: true,
    },
    item: {
      type: String,
      
    },
    bin: {
        type: Boolean,
        required: true,
        default: false,
      },
    problem: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    amount: {
      type: Number,
      required: true,
    },
    invoiceId: {
      type: Number,
      unique:true,
      required: true,
    },
    stage: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    review: {
      type: String,
    },
    comment: {
      type: String,
      required: true,
      default: 'No Comment yet.'
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("tasks", tasksSchema);

export default Tasks;
