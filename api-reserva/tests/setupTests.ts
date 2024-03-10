import 'dotenv/config';
import { cleanDatasource, setiupServerTest, setupDatasourceTest, teardownAppTest } from './main';

process.env.DB_NAME = process.env.DB_NAME_TEST;


export const [app] = setiupServerTest();

beforeAll(async () =>{
    await setupDatasourceTest();
    await cleanDatasource();
});

afterAll(async () =>{
    await teardownAppTest();
});

