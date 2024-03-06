import { baseValidator } from '@core/validators/base.validator';
import { exists } from '@core/validators/joiCustomValidators';
import { AppDataSource } from '@datasource/mysql';
import { ReservaEntity } from '@datasource/mysql/entities';
import Joi from 'joi';


const reservaDeleteSchema = Joi.object({
    body: {
        reservaId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(ReservaEntity),
            columnName: 'id'
        }))
    }
});


export const reservaDeleteValidator = baseValidator(reservaDeleteSchema);