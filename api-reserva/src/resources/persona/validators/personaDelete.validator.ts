import { baseValidator } from '@core/validators/base.validator';
import { exists } from '@core/validators/joiCustomValidators';
import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity } from '@datasource/mysql/entities';
import Joi from 'joi';


const personaDeleteSchema = Joi.object({
    body: {
        personaId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(PersonaEntity),
            columnName: 'id'
        }))
    }
});


export const personaDeleteValidator = baseValidator(personaDeleteSchema);