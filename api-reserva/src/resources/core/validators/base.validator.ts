import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { joiCustomMessages } from './joiCustomValidators/customMessages';


export interface RequestInputError{
    errors: {[label: string]: string}[]
}

export function baseValidator(schema: Joi.ObjectSchema<any>, extraValidate?: (req: Request) => Promise<RequestInputError>){
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
        
            await schema.validateAsync(req, {
                abortEarly: false,
                allowUnknown: true,
                messages: joiCustomMessages
            });
            
            if(typeof extraValidate !== 'undefined'){
                const errors: RequestInputError = await extraValidate(req);
                if(errors.errors.length === 0){ 
                    next();
                    return;
                }
                return res.status(HTTP_RESPONSES.BAD_REQUEST.code).json(errors);
            }

            next();
        }catch(errors: unknown){
    
            if(errors instanceof Joi.ValidationError){

                const parseErrors = errors.details.map((err) => {
                    let label = err.context!.label as string;
                    let message = err.message;

                    if(label.startsWith('body.')){
                        label = label.split('body.')[1]!;
                        message = err.message.split('body.')[1].replace('"', '');  
                    }

                    return {[label!]: message};
                })

                return res.status(HTTP_RESPONSES.BAD_REQUEST.code).json({
                    errors: parseErrors
                });
            }
    
            next(errors);
        }
    }
}