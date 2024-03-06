import express from 'express';
import appRouter from './server.router';

const app = express();


app.use(appRouter);

export interface ServerOptions{
    port: number;
}

export function createServerApp(options: ServerOptions){
    const server = app.listen(options.port, () => {
        console.log(`El servidor esta corriendo en el puerto ${options.port}`)
    });

    return [app, server];
}