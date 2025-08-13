import mongoose from "mongoose";

const envUri = process.env.DATABASE_URL;

if (!envUri) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

// Now TypeScript knows uri is a string
const MONGODB_URI: string = envUri;

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

export async function connectDB(): Promise<mongoose.Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
