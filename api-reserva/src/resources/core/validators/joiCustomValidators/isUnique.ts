import Joi from "joi";
import { Repository } from "typeorm";


export const isUniqueErrorMessage = {
    'string.unique': '{{#label}} debe ser unico'
}

interface IsUniqueParams{
    repository: Repository<any>;
    columnName: string;
}

export const isUnique: (existsParams: IsUniqueParams) => Joi.ExternalValidationFunction = 
(isUniqueParams: IsUniqueParams) => {
    
    const {repository, columnName} = isUniqueParams;

    return async (value, helper) => {

        const exist = await repository.countBy({
            [columnName]: value
        });
    
        if(exist >= 1){
            return helper.error('string.unique');
        }

        return value;
    }
}