import Workout from '../Model/Workout.js';
import mongoose from 'mongoose';

// Get all workouts
export const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single workout by ID
export const getWorkout = async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new workout
export const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout by ID
export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    // Find the workout and delete it
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(400).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
};

// Update a workout by ID
export const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout" });
    }

    try {
        const workout = await Workout.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // Return the updated document
        );

        if (!workout) {
            return res.status(400).json({ error: "No such workout" });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
