import 'dotenv/config';
import { AppDataSource } from '@datasource/mysql';
import { createServerApp } from '@server/index';
import { HabitacionEntity, PersonaEntity } from '@datasource/mysql/entities';
import { MoreThanOrEqual } from 'typeorm';

export async function setupDatasourceTest(){
    await AppDataSource.initialize();
}

export async function cleanDatasource() {
    const personaRepo = AppDataSource.getRepository(PersonaEntity);
    const habitacionRepo = AppDataSource.getRepository(HabitacionEntity);;
    await personaRepo.delete({ id: MoreThanOrEqual(1) });
    await habitacionRepo.delete({ id: MoreThanOrEqual(1) });
}

export function setiupServerTest(){
    return createServerApp({
        port: Number(process.env.PORT),
        testENV: true
    });
}

export async function teardownAppTest(){
    await AppDataSource.destroy();
}

