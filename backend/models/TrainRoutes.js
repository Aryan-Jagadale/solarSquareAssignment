import mongoose from "mongoose";

const TrainRoutesSchema = new mongoose.Schema({
  train_id: {
    type: Number,
    required: true,
    unique: true,
  },
  train_name: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance_km: {
    type: Number,
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  arrival_time: {
    type: Date,
    required: true,
  },
});

export const TrainRoute = mongoose.model("TrainRoute", TrainRoutesSchema);
