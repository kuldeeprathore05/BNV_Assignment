import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.MONGODB_URI; 

mongoose.connect(DB) // no options needed
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database connection error:", err));
