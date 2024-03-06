import 'dotenv/config';
import { AppDataSource } from '@datasource/mysql';
import { createServerApp } from './server';

async function initApp(){
    try{
        await AppDataSource.initialize();
        
        if(AppDataSource.isInitialized === true){
            console.log('Conexion con Mysql establecida ', AppDataSource.isInitialized);
        }

        createServerApp({
            port: Number(process.env.PORT)
        });

    }catch(error){
        console.log(error);
    }
}

initApp();