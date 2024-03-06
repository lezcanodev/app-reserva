import { RequestInputError, baseValidator } from '@core/validators/base.validator';
import Joi from 'joi';


const personaFindAllSchema = Joi.object({
    query: {
        fields: Joi.string().trim()
    }
})


export const personaFindAllValidator = baseValidator(personaFindAllSchema, async (req) => {
    const errors: RequestInputError = {errors: []};
    let fields = (req.query.fields as string);

    if(typeof fields === 'undefined' || fields.length === 0) return errors;

    const validSelecFields = ['id', 'nombre', 'apellido', 'nroDocumento', 'correo', 'telefono' ];
    const selectFields = fields.split(',');

    selectFields.forEach(selectField => {
        if(!validSelecFields.includes(selectField)){
            errors.errors.push({ [selectField]: `el campo ${selectField} no existe` })
        }
    });

    return errors;
});