import { cleanDatasource, setiupServerTest, setupDatasourceTest, teardownAppTest } from '@tests/main';
import { habitacionStub } from '../models/habitacion.fake';
import request from 'supertest';
import { app } from '@tests/setupTests';

describe('Post Method', () => {

   
    beforeEach(async () => {
        await cleanDatasource();
    });

    it('Deberia crear correctamente una habitacion', async () => {
        const habitacionStubProps = habitacionStub.getProps(); 

        const response = await request(app).post('/habitaciones').send(habitacionStubProps);

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
            data: {
                cantCamas: habitacionStubProps.cantCamas  ,
                numero: habitacionStubProps.numero  ,
                piso: habitacionStubProps.piso ,
                tieneFrigobar: habitacionStubProps.tieneFrigobar  ,
                tieneTelevision: habitacionStubProps.tieneTelevision  
            }
        });
    });

});