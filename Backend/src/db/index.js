import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  try {
    const connectionInstanceObject = mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB Connected!! DB HOST: ${connectionInstanceObject.connection.host}`
    );
  } catch (err) {
    console.log("Mongodb Connection Failure", err);
    process.exit(1);
  }
};

export default connectDB;
