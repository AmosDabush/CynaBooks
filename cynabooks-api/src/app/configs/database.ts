import mongoose from "mongoose";

const connectToDatabase = async (): Promise<void> => {
  try {
    const dbUri: string =
      process.env.MONGODB_URI ?? "mongodb://localhost:27017/CYNABOOKS";

    await mongoose.connect(dbUri, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectToDatabase;
