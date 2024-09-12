import express from 'express';

const router = express.Router();

router.get('/', (req,res) =>{
    res.json({ msg: "Get all workouts" });
})
router.post('/', async (req,res) =>{
    const[title, load, reps] = req.body;
    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
})

export default router