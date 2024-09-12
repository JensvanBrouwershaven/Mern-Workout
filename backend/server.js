import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/workoutRoutes.js";

const app = express();

// Load variables from the .env file
dotenv.config();
console.log("Environment variables loaded.");

// Middleware to parse JSON
app.use(express.json());
console.log("Express JSON middleware added.");

// Routes
app.use("/api/workouts", router);
console.log("Routes initialized.");

// Connect to mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connection successful!");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });


