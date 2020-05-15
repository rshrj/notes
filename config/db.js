const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(`MongoDB Connection Failed, exiting. ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
