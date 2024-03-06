import { baseValidator } from '@core/validators/base.validator';
import { exists } from '@core/validators/joiCustomValidators';
import { AppDataSource } from '@datasource/mysql';
import { HabitacionEntity } from '@datasource/mysql/entities/habitacion.entity';
import { Habitacion } from '@habitacion/models/habitacion.model';
import { Request } from 'express';
import Joi from 'joi';
import { HabitacionValidatorHelper } from './helper/habitacionValidator.helper';


const habitacionUpdateSchema = Joi.object({
    body: {
        habitacionId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(HabitacionEntity),
            columnName: 'id'
        })),
        piso: Joi.number().min(Habitacion.MIN_PISOS).max(Habitacion.MAX_PISOS),
        numero: Joi.number().min(Habitacion.MIN_NRO).max(Habitacion.MAX_NRO),
        cantCamas: Joi.number().min(Habitacion.MIN_CAMAS).max(Habitacion.MAX_CAMAS),
        tieneTelevision: Joi.boolean().default(false),
        tieneFrigobar: Joi.boolean().default(false),
    }
});


export const habitacionUpdateValidator = baseValidator(habitacionUpdateSchema, async (req: Request) => {
    return await HabitacionValidatorHelper.isFreeHabitacion(req.body.piso, req.body.numero, req.body.habitacionId);
});