require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDB");
    // Start your application logic here
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.stack);
  }
}

connectToDatabase();