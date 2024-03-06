
import express from 'express';
import basePersonaRouter from './persona.router';

const personaRouter = express.Router();

personaRouter.use(basePersonaRouter);

export default personaRouter;