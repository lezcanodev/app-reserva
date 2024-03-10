import express, {Express} from 'express';
import appRouter from './server.router';
import { Server } from 'http';

const app = express();


app.use(appRouter);

export interface ServerOptions{
    port: number;
    testENV?: boolean
}

export function createServerApp(options: ServerOptions): [Express, Server]{
    if(options.testENV === true) return [app, null!];

    const server = app.listen(options.port, () => {
        console.log(`El servidor esta corriendo en el puerto ${options.port}`)
    });

    return [app, server];
}