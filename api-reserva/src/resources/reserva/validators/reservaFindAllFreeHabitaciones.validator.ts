import { DateService } from '@core/models/services/date.service';
import { RequestInputError, baseValidator } from '@core/validators/base.validator';
import { ReservaServiceChecker } from '@reserva/models/services/reservaChecker.service';
import Joi from 'joi';


const reservaFindAllFreeHabitacionesSchema = Joi.object({
    query: {
        fehcaEntrada:Joi.date().iso().required(),
        fechaSalida:Joi.date().iso().required()
    }
});


export const reservaFindAllFreeHabitacionesValidator = baseValidator(reservaFindAllFreeHabitacionesSchema, async (req) => {
    const errors: RequestInputError = {errors:[]};
    const fechaEntrada = new Date((req.query.fehcaEntrada as string));
    const fechaSalida = new Date((req.query.fechaSalida as string));

    const validFechaSalida = ReservaServiceChecker.isValidFechaSalida(fechaSalida, fechaEntrada);
    if(validFechaSalida !== null){
        errors.errors.push({'fechaSalida': validFechaSalida.message})
    }

    return errors;
});