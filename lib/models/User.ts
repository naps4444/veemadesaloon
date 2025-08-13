import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Date },
  password: { type: String },
  image: { type: String },
  role: { type: String, default: "admin" },
});

export const User = mongoose.models.User || model("User", userSchema);
