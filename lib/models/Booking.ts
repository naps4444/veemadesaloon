import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  reference: { type: String, unique: true, required: true },
  total: { type: Number, required: true },
  services: { type: Array, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = mongoose.models.Booking || model("Booking", bookingSchema);
