import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_url);
    console.log(`Mongo connect: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Db error message: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
