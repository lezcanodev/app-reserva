import { baseValidator } from '@core/validators/base.validator';
import { isUnique } from '@core/validators/joiCustomValidators/isUnique';
import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity } from '@datasource/mysql/entities';
import Joi from 'joi';


const personaCreatorSchema = Joi.object({
    body: {
        nombre: Joi.string().trim().required(),
        apellido: Joi.string().trim().required(),
        nroDocumento: Joi.number().required().external(isUnique({
            repository: AppDataSource.getRepository(PersonaEntity),
            columnName: 'nroDocumento'
        })),
        correo: Joi.string().trim().required().email(),
        telefono: Joi.number().required()
    }
})


export const personaCreatorValidator = baseValidator(personaCreatorSchema);