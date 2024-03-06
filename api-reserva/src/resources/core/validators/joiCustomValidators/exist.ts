import Joi from "joi";
import { Repository } from "typeorm";


export const existsErrorMessage = {
    'string.exists': '{{#label}} no existe'
}

interface ExistsParams{
    repository: Repository<any>;
    columnName: string;
    required?: boolean;
}

export const exists: (existsParams: ExistsParams) => Joi.ExternalValidationFunction = 
(existsParams: ExistsParams) => {
    
    const {repository, columnName, required} = existsParams;

    return async (value, helper) => {
        if(typeof value === 'undefined' || value == null){
            if(typeof required !== 'undefined' && !required) return value;
            return helper.error('string.exists');
        }

        const exist = await repository.countBy({
            [columnName]: value
        });
    
        if(exist <= 0){
            return helper.error('string.exists');
        }

        return value;
    }
}