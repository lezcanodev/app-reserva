import { baseValidator } from '@core/validators/base.validator';
import { exists } from '@core/validators/joiCustomValidators';
import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity } from '@datasource/mysql/entities';
import Joi from 'joi';


const personaUpdateSchema = Joi.object({
    body: {
        personaId: Joi.number().required().external(exists({
            repository: AppDataSource.getRepository(PersonaEntity),
            columnName: 'id'
        })),
        nombre: Joi.string().trim(),
        apellido: Joi.string().trim(),
        nroDocumento: Joi.string().trim(),
        correo: Joi.string().trim().email(),
        telefono: Joi.string().trim()
    }
});


export const personaUpdateValidator = baseValidator(personaUpdateSchema);