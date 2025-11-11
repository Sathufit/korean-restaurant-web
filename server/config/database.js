// MongoDB Connection Configuration using Mongoose
require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hanguk_bites';

// Connection options for better performance and reliability
const options = {
  // useNewUrlParser: true,  // deprecated in mongoose 6+
  // useUnifiedTopology: true,  // deprecated in mongoose 6+
  maxPoolSize: 10,  // Maximum number of connections in the pool
  serverSelectionTimeoutMS: 5000,  // Timeout for initial connection
  socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${mongoose.connection.name}`);
    console.log(`🌍 Host: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Check if MongoDB is running (local) or connection string is correct (cloud)');
    console.error('2. Verify MONGODB_URI in .env file');
    console.error('3. Check network/firewall settings');
    console.error('');
    process.exit(1);  // Exit if database connection fails
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
const gracefulShutdown = async (msg) => {
  try {
    await mongoose.connection.close();
    console.log(`🛑 Mongoose disconnected through ${msg}`);
    process.exit(0);
  } catch (err) {
    console.error('Error during graceful shutdown:', err);
    process.exit(1);
  }
};

// Handle application termination
process.on('SIGINT', () => gracefulShutdown('app termination (SIGINT)'));
process.on('SIGTERM', () => gracefulShutdown('app termination (SIGTERM)'));
process.once('SIGUSR2', () => gracefulShutdown('nodemon restart'));

module.exports = { connectDB, mongoose };
