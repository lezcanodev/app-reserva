
import express from 'express';
import baseHabitacionRouter from './habitacion.router';

const habitacionRouter = express.Router();

habitacionRouter.use(baseHabitacionRouter);

export default habitacionRouter;