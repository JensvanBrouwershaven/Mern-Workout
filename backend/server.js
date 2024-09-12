import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/workoutRoutes.js";

const app = express();

// Load variables from the .env file
dotenv.config();

// Routes
app.use("/api/workouts", router);

// Connect mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
