const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {});
    console.log(`MongoDB connected: ${db.connection.host}`.magenta);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  dbConnect,
};
