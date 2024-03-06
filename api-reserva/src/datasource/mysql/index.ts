import path from 'path';
import { DataSource } from 'typeorm';


const entitiesDir = path.join(__dirname, 'entities', '*.{js,ts}');

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [entitiesDir]
})
