import { baseValidator } from '@core/validators/base.validator';
import { exists } from '@core/validators/joiCustomValidators';
import { AppDataSource } from '@datasource/mysql';
import { HabitacionEntity } from '@datasource/mysql/entities/habitacion.entity';
import Joi from 'joi';


const habitacionDeleteSchema = Joi.object({
    body: {
        habitacionId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(HabitacionEntity),
            columnName: 'id'
        }))
    }
});


export const habitacionDeleteValidator = baseValidator(habitacionDeleteSchema);