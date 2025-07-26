const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;