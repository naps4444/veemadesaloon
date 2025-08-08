// test-mongo.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.DATABASE_URL || '';

async function testMongo() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

testMongo();
