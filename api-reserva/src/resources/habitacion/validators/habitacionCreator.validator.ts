import { baseValidator } from '@core/validators/base.validator';
import { Habitacion } from '@habitacion/models/habitacion.model';
import { Request } from 'express';
import Joi from 'joi';
import { HabitacionValidatorHelper } from './helper/habitacionValidator.helper';


const habitacionCreatorSchema = Joi.object({
    body: {
        piso: Joi.number().min(Habitacion.MIN_PISOS).max(Habitacion.MAX_PISOS).required(),
        numero: Joi.number().min(Habitacion.MIN_NRO).max(Habitacion.MAX_NRO).required(),
        cantCamas: Joi.number().min(Habitacion.MIN_CAMAS).max(Habitacion.MAX_CAMAS).required(),
        tieneTelevision: Joi.boolean().default(false),
        tieneFrigobar: Joi.boolean().default(false),
    }
})


export const habitacionCreatorValidator = baseValidator(habitacionCreatorSchema, async (req: Request) => {
    return await HabitacionValidatorHelper.isFreeHabitacion(req.body.piso, req.body.numero);
});