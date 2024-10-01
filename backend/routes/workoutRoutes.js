import express from 'express';
import {
    getWorkouts,
    createWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
} from '../controllers/workoutController.js';

const router = express.Router();

// Define routes
router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout); // Use PATCH for partial updates or PUT for full updates

export default router;
