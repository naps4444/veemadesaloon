require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.DATABASE_URL;

if (!mongoURI) {
  console.error("❌ DATABASE_URL not found in .env");
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
})();
