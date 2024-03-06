import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import habitacionRouter from '@habitacion/router';
import personaRouter from '@persona/router';
import reservaRouter from '@reserva/router';
import express, { Request, Response } from 'express';
import cors from 'cors';

const appRouter = express.Router();

//Middlewares
appRouter.use(cors({
    origin: ['https://lezcanodev.github.io', 'https://lezcanodev.github.io/', 'https://lezcanodev.github.io/forntent-app-reserva/']
}));
appRouter.use(express.json());

//Rutas de los recursos
appRouter.use('/personas', personaRouter);
appRouter.use('/habitaciones', habitacionRouter);
appRouter.use('/reservas', reservaRouter);

//Controla el caso de que el recurso no exista
appRouter.use((req: Request, res: Response) => {
    res.status(HTTP_RESPONSES.NOT_FOUND.code).send({
        message: HTTP_RESPONSES.NOT_FOUND.message
    });
});

//Controla los errores
appRouter.use((error: unknown, req: Request, res: Response) => {
    res.status(HTTP_RESPONSES.INTERNAL_SERVER_ERROR.code).send({
        message: HTTP_RESPONSES.INTERNAL_SERVER_ERROR.message
    });
});

export default appRouter;

