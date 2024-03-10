import { AppDataSource } from '@datasource/mysql';
import { HabitacionEntity, PersonaEntity } from '@datasource/mysql/entities';
import { personaStub } from '@tests/resources/persona/models/persona.fake';
import { cleanDatasource} from '@tests/main';
import { habitacionStub } from '@tests/resources/habitacion/models/habitacion.fake';
import request from 'supertest';
import { ReservaCalcMonto } from '@reserva/models/services/reservaCalcMonto.service';
import { geneareValidFechasReserva } from './helper';
import { app } from '@tests/setupTests';


describe('Post Method', () => {

    beforeEach(async () => {
        await cleanDatasource();
    });

    it('Creaa unw nueva reserva correctamente', async () => {
        const habitacionRepo = AppDataSource.getRepository(HabitacionEntity);
        const personaRepo = AppDataSource.getRepository(PersonaEntity);
        const habitacionStubProps = habitacionStub.getProps(); 
        const personaStubProps = personaStub.getProps(); 
        
        await Promise.all([habitacionRepo.save(habitacionStubProps), personaRepo.save(personaStubProps)]);

        const fechaEntrada = new Date();
        fechaEntrada.setUTCDate(fechaEntrada.getUTCDate()+1);
        const fechaSalida = new Date();
        fechaSalida.setUTCDate(fechaSalida.getUTCDate()+2);

        const response = await request(app).post('/reservas').send({
            personaId: personaStubProps.id,
            habitacionId: habitacionStubProps.id,
            fechaEntrada: fechaEntrada.toISOString(),
            fechaSalida: fechaSalida.toISOString()
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
            data: {
                fechaEntrada: fechaEntrada.toISOString(),
                fechaReserva: expect.any(String),
                fechaSalida: fechaSalida.toISOString(),
                habitacionId: habitacionStubProps.id,
                personaId: personaStubProps.id,
                montoReserva: ReservaCalcMonto.calcMontoReserva(fechaEntrada, fechaSalida) 
            }
        });

    })

    it('deberia retornar 400 por que la habitacion no existe', async () => {

        const HABITACION_NO_EXIST_ID = 1;
        const personaRepo = AppDataSource.getRepository(PersonaEntity);
        const personaStubProps = personaStub.getProps(); 
        const [fechaEntrada, fechaSalida] = geneareValidFechasReserva();

        await Promise.all([personaRepo.save(personaStubProps)]);

        const response = await request(app).post('/reservas').send({
            personaId: personaStubProps.id,
            habitacionId: HABITACION_NO_EXIST_ID,
            fechaEntrada: fechaEntrada.toISOString(),
            fechaSalida: fechaSalida.toISOString()
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
            errors:[ {habitacionId: expect.any(String)} ]
        });
    });

    it('deberia retornar 400 por que la persona no existe', async () => {
        const PERSONA_NO_EXIST_ID = 1;
        const habitacionRepo = AppDataSource.getRepository(HabitacionEntity);
        const habitacionStubProps = habitacionStub.getProps(); 
        const [fechaEntrada, fechaSalida] = geneareValidFechasReserva();

        await Promise.all([habitacionRepo.save(habitacionStubProps)]);

        const response = await request(app).post('/reservas').send({
            personaId: PERSONA_NO_EXIST_ID,
            habitacionId: habitacionStubProps.id,
            fechaEntrada: fechaEntrada.toISOString(),
            fechaSalida: fechaSalida.toISOString()
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
            errors:[ {personaId: expect.any(String)} ]
        });
    });

});

describe('Post method deberia retornar 400 por que la fecha de reserva esta ocupada',() => {
    
    const habitacionRepo = AppDataSource.getRepository(HabitacionEntity);
    const personaRepo = AppDataSource.getRepository(PersonaEntity);
    const habitacionStubProps = habitacionStub.getProps(); 
    const personaStubProps = personaStub.getProps(); 
        
    const fechaEntrada = new Date('2024-04-10');
    const fechaSalida = new Date('2024-04-25');
    const reserva = {
        personaId: personaStubProps.id,
        habitacionId: habitacionStubProps.id,
        fechaEntrada: fechaEntrada.toISOString(),
        fechaSalida: fechaSalida.toISOString()
    }
    
    beforeEach(async () => {
        await cleanDatasource();
        await Promise.all([habitacionRepo.save(habitacionStubProps), personaRepo.save(personaStubProps)]);
        await request(app).post('/reservas').send(reserva);
    });

    it('fechas de reservas iguales', async () => {
        const response = await request(app).post('/reservas').send(reserva);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
            errors:[ {habitacion: "la habitacion ya ha sido reservada en ese rango de fechas"} ]
        });
    });

    it('fechas de entrada pertenece a un rango de fechas ya reservadas', async () => {
        reserva.fechaSalida = new Date('2024-05-25').toISOString();
        const response = await request(app).post('/reservas').send(reserva);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
            errors:[ {habitacion: "la habitacion ya ha sido reservada en ese rango de fechas"} ]
        });
    });

    it('fechas de salida pertenece a un rango de fechas ya reservadas', async () => {
        reserva.fechaEntrada = new Date('2024-04-09').toISOString();
        const response = await request(app).post('/reservas').send(reserva);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
            errors:[ {habitacion: "la habitacion ya ha sido reservada en ese rango de fechas"} ]
        });
    });

    it('rango de fechas de entrada y salida pertenece a un rango de fechas ya reservadas', async () => {
        reserva.fechaEntrada = new Date('2024-04-15').toISOString();
        reserva.fechaSalida = new Date('2024-04-18').toISOString();
        const response = await request(app).post('/reservas').send(reserva);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
            errors:[ {habitacion: "la habitacion ya ha sido reservada en ese rango de fechas"} ]
        });
    });

    it('existe una fecha reservada dentro del rango fechas de entrada y salida elegidas', async () => {
        reserva.fechaEntrada = new Date('2024-04-09').toISOString();
        reserva.fechaSalida = new Date('2025-04-18').toISOString();
        const response = await request(app).post('/reservas').send(reserva);
        expect(response.statusCode).toBe(400);
        expect(response.body).toMatchObject({
            errors:[ {habitacion: "la habitacion ya ha sido reservada en ese rango de fechas"} ]
        });
    });

}); 