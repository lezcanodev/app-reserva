import { RequestInputError, baseValidator } from '@core/validators/base.validator';
import { exists } from '@core/validators/joiCustomValidators';
import { AppDataSource } from '@datasource/mysql';
import { HabitacionEntity, PersonaEntity } from '@datasource/mysql/entities';
import { ReservaServiceChecker } from '@reserva/models/services/reservaChecker.service';
import { Request } from 'express';
import Joi from 'joi';
import { reservaChecker } from '@reserva/repositories/reservaChecker';


const reservaCreatorSchema = Joi.object({
    body: {
        personaId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(PersonaEntity),
            columnName: 'id'
        })),
        habitacionId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(HabitacionEntity),
            columnName: 'id'
        })),
        fechaEntrada: Joi.date().iso().required(),
        fechaSalida: Joi.date().iso().required()  
    }
})


export const reservaCreatorValidator = baseValidator(reservaCreatorSchema, async (req: Request) => {
    const errors: RequestInputError = {errors:[]};
    const fechaEntrada = new Date(req.body.fechaEntrada);
    const fechaSalida = new Date(req.body.fechaSalida);
    const validFechaEntrada = ReservaServiceChecker.isValidFechaEntrada(fechaEntrada); 
    const validFechaSalida = ReservaServiceChecker.isValidFechaSalida(fechaSalida, fechaEntrada); 

    if(validFechaEntrada !== null){
        errors.errors.push({'fechaEntrada': validFechaEntrada.message});
    }

    if(validFechaSalida !== null){
        errors.errors.push({'fechaSalida': validFechaSalida.message});
    }
    
    if(validFechaEntrada === null && validFechaSalida === null){
        const isFree = await reservaChecker.isFreeReserva({
            habitacionId: req.body.habitacionId,
            fechaEntrada: fechaEntrada,
            fechaSalida: fechaSalida
        });
       
        if(!isFree) errors.errors.push({habitacion: 'la habitacion ya ha sido reservada en ese rango de fechas'})
    }
    
    return errors;
});