
import express from 'express';
import baseReservaRouter from './reserva.router';

const reservaRouter = express.Router();

reservaRouter.use(baseReservaRouter);

export default reservaRouter;