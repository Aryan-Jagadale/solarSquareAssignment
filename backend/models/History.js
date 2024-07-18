import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String, 
  },
  gender: {
    type: String,
  },
  seatType: {
    type: String,
  },
  isInfant: {
    type: Boolean,
    default: true,
  }
});


const HistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainRoute",
      required: true,
    },
    passengers: {
      type: [PassengerSchema],
      required: true,
    },
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    train_id: {
      type: Number,
      required: true,
    },
    bookedAt: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

export const History = mongoose.model("History", HistorySchema);
