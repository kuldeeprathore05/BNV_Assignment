import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import users from "./models/userSchema.js";

// Load dotenv
dotenv.config({ path: path.resolve('./.env') });

const DB = process.env.MONGODB_URI;

if (!DB) throw new Error("MONGO_URI is not defined in .env");

// Connect to MongoDB
mongoose.connect(DB)
  .then(() => {
    console.log("Database Connected");

    const sampleUsers = [
    { firstname: "John", lastname: "Doe", email: "john@example.com", mobile: "9876543210", gender: "Male", status: "Active", profile: "john.png", location: "New York" },
    { firstname: "Jane", lastname: "Smith", email: "jane@example.com", mobile: "9123456780", gender: "Female", status: "Active", profile: "jane.png", location: "London" },
    { firstname: "Alice", lastname: "Johnson", email: "alice@example.com", mobile: "9988776655", gender: "Female", status: "Inactive", profile: "alice.png", location: "Paris" },
    { firstname: "Bob", lastname: "Brown", email: "bob@example.com", mobile: "9012345678", gender: "Male", status: "Active", profile: "bob.png", location: "Tokyo" },
    { firstname: "Charlie", lastname: "Davis", email: "charlie@example.com", mobile: "9234567890", gender: "Male", status: "Inactive", profile: "charlie.png", location: "Berlin" },
    { firstname: "Eve", lastname: "Miller", email: "eve@example.com", mobile: "9345678901", gender: "Female", status: "Active", profile: "eve.png", location: "Sydney" },
    { firstname: "Frank", lastname: "Wilson", email: "frank@example.com", mobile: "9456789012", gender: "Male", status: "Active", profile: "frank.png", location: "Toronto" },
    { firstname: "Grace", lastname: "Taylor", email: "grace@example.com", mobile: "9567890123", gender: "Female", status: "Inactive", profile: "grace.png", location: "Rome" },
    { firstname: "Hank", lastname: "Anderson", email: "hank@example.com", mobile: "9678901234", gender: "Male", status: "Active", profile: "hank.png", location: "Dubai" },
    { firstname: "Ivy", lastname: "Thomas", email: "ivy@example.com", mobile: "9789012345", gender: "Female", status: "Active", profile: "ivy.png", location: "Singapore" },
    { firstname: "Jack", lastname: "Moore", email: "jack@example.com", mobile: "9890123456", gender: "Male", status: "Inactive", profile: "jack.png", location: "Los Angeles" },
    { firstname: "Karen", lastname: "Martin", email: "karen@example.com", mobile: "9901234567", gender: "Female", status: "Active", profile: "karen.png", location: "Chicago" },
    { firstname: "Leo", lastname: "Jackson", email: "leo@example.com", mobile: "9912345678", gender: "Male", status: "Active", profile: "leo.png", location: "Miami" },
    { firstname: "Mia", lastname: "White", email: "mia@example.com", mobile: "9923456789", gender: "Female", status: "Inactive", profile: "mia.png", location: "Barcelona" },
    { firstname: "Nick", lastname: "Harris", email: "nick@example.com", mobile: "9934567890", gender: "Male", status: "Active", profile: "nick.png", location: "Amsterdam" },
    { firstname: "Olivia", lastname: "Clark", email: "olivia@example.com", mobile: "9945678901", gender: "Female", status: "Active", profile: "olivia.png", location: "Vienna" },
    { firstname: "Paul", lastname: "Lewis", email: "paul@example.com", mobile: "9956789012", gender: "Male", status: "Inactive", profile: "paul.png", location: "Stockholm" },
    { firstname: "Quinn", lastname: "Robinson", email: "quinn@example.com", mobile: "9967890123", gender: "Female", status: "Active", profile: "quinn.png", location: "Copenhagen" },
    { firstname: "Ryan", lastname: "Walker", email: "ryan@example.com", mobile: "9978901234", gender: "Male", status: "Active", profile: "ryan.png", location: "Dublin" },
    { firstname: "Sophia", lastname: "Hall", email: "sophia@example.com", mobile: "9989012345", gender: "Female", status: "Inactive", profile: "sophia.png", location: "Lisbon" }
];

    // Run async seeding inside an async function
    const seedData = async () => {
      try {
        await users.deleteMany(); // clears collection
        const inserted = await users.insertMany(sampleUsers);
        console.log("Sample users inserted:", inserted);
        process.exit();
      } catch (error) {
        console.log("Error inserting sample users:", error);
        process.exit(1);
      }
    };

    seedData();
  })
  .catch(err => {
    console.log("Database connection error:", err);
  });

 