import { cleanDatasource } from '@tests/main';
import { personaStub } from '../models/persona.fake';
import request from 'supertest';
import { app } from '@tests/setupTests';


describe('Post Method', () => {

    beforeEach(async () => {
        await cleanDatasource();
    });

    it('debe crear correctamente una persona', async () => {
        const personaStubProps = personaStub.getProps(); 

        const response = await request(app).post('/personas').send(personaStubProps);

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
            data: {
                nombre:  personaStubProps.nombre, 
                apellido:  personaStubProps.apellido, 
                correo:  personaStubProps.correo, 
                nroDocumento:  personaStubProps.nroDocumento, 
                telefono:  personaStubProps.telefono
            }
        });
    })

})