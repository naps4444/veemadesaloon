// File: lib/mongoose.ts
import mongoose from "mongoose";

const uri = process.env.DATABASE_URL!;
if (!uri) throw new Error("Please define DATABASE_URL in .env.local");

let isConnected = false;

export async function dbConnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(uri, {
      dbName: "veemadeit",
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}
