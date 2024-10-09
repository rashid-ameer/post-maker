import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGO_URI);
    console.log(`Connected to database: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectDB;
