import { RequestInputError, baseValidator } from '@core/validators/base.validator';
import { exists } from '@core/validators/joiCustomValidators';
import { AppDataSource } from '@datasource/mysql';
import { HabitacionEntity, PersonaEntity, ReservaEntity } from '@datasource/mysql/entities';
import { ReservaServiceChecker } from '@reserva/models/services/reservaChecker.service';
import { Request } from 'express';
import Joi from 'joi';
import { reservaChecker } from '@reserva/repositories/reservaChecker';
import { reservaFinder } from '@reserva/repositories/reservaFinder';
import ReservaProps from '@reserva/models/reserva.model';
import { DateService } from '@core/models/services/date.service';

const reservaUpdateSchema = Joi.object({
    body: {
        reservaId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(ReservaEntity),
            columnName: 'id'
        })),
        personaId: Joi.number().external(exists({
            repository: AppDataSource.getRepository(PersonaEntity),
            columnName: 'id',
            required: false
        })),
        habitacionId: Joi.number().external(exists({
            repository: AppDataSource.getRepository(HabitacionEntity),
            columnName: 'id',
            required: false
        })),
        fechaEntrada: Joi.date().iso(),
        fechaSalida: Joi.date().iso()  
    }
})


export const reservaUpdateValidator = baseValidator(reservaUpdateSchema, async (req: Request) => {
    const errors: RequestInputError = {errors:[]};
    
    let fechaEntrada = null;
    let fechaEntradaCurrent = null;
    let fechaSalida = null;
    let habitacionId = req.body?.habitacionId;
    let validFechaSalida = null;
    let validFechaEntrada = null; 

    if('fechaEntrada' in req.body && 'fechaSalida' in req.body){
        
        const currentReserva = (await reservaFinder.findById(req.body.reservaId)) as ReservaProps;
        
        if(typeof habitacionId === 'undefined') habitacionId = currentReserva.habitacionId;
        
        fechaEntradaCurrent = new Date(currentReserva.fechaEntrada);
        fechaSalida = new Date(req.body.fechaSalida);
        fechaEntrada = new Date(req.body.fechaEntrada);

    }else if('fechaEntrada' in req.body  || 'fechaSalida' in req.body){
        
        const currentReserva = (await reservaFinder.findById(req.body.reservaId)) as ReservaProps;
        if(typeof habitacionId === 'undefined') habitacionId = currentReserva.habitacionId;

        if(!('fechaEntrada' in req.body)){
            req.body.fechaEntrada = currentReserva.fechaEntrada;
            fechaSalida = new Date(req.body.fechaSalida);
            fechaEntrada = new Date(currentReserva.fechaEntrada);
        }

        if(!('fechaSalida' in req.body)){
            req.body.fechaSalida = currentReserva.fechaSalida;
            fechaEntradaCurrent = new Date(currentReserva.fechaEntrada);
            fechaEntrada = new Date(req.body.fechaEntrada);
            fechaSalida = new Date(currentReserva.fechaSalida);
        }

    }
    

    if(fechaEntrada !== null && fechaEntradaCurrent !== null && !DateService.datesAreEquals(fechaEntrada, fechaEntradaCurrent) ){
         validFechaEntrada = ReservaServiceChecker.isValidFechaEntrada(fechaEntrada);
    }
    if(fechaSalida !== null) validFechaSalida = ReservaServiceChecker.isValidFechaSalida(fechaSalida, fechaEntrada!);

    if(validFechaEntrada !== null){
        errors.errors.push({'fechaEntrada': validFechaEntrada.message});
    }

    if(validFechaSalida !== null){
        errors.errors.push({'fechaSalida': validFechaSalida.message});
    }
    
    if((validFechaEntrada === null && validFechaSalida === null && (fechaEntrada != null || fechaSalida != null))){
        const isFree = await reservaChecker.isFreeReserva({
            habitacionId: habitacionId,
            fechaEntrada: fechaEntrada!,
            fechaSalida: fechaSalida!,
            exceptReservaId: req.body.reservaId
        });
       
        if(!isFree) errors.errors.push({habitacion: 'la habitacion ya ha sido reservada en ese rango de fechas'})
    }
    
    return errors;
});