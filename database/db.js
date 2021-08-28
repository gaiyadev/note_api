require("dotenv").config();
const mongoose = require("mongoose");
const stackOtp = require("stack-otp");

const ConnectDb = async () => {
  console.log(stackOtp.specialChars());
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to Database Successfully..."))
    .catch((err) => console.error("Failed Could not connect to Database", err));
};

ConnectDb();
