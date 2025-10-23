import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) {
    console.error("MONGODB_URI is not defined in environment variables");
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};
