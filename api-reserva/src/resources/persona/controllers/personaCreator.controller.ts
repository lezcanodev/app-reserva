import BaseController from '@core/controllers/baseController.controller';
import { parseInputRequestError } from '@core/helper/formatResponse.helper';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { PersonaError } from '@persona/models/persona.error';
import { Persona } from '@persona/models/persona.model';
import { PersonaCreatorRepository } from '@persona/repositories/interfaces/personaCreator.repository';
import { Request, Response } from 'express';


export interface PersonaCreatorControllerParams{
    readonly personaCreator: PersonaCreatorRepository
}

export default class PersonaCreatorController extends BaseController{

    public constructor(private readonly params: PersonaCreatorControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {
        try{
            const personaProps = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nroDocumento: req.body.nroDocumento,
                correo: req.body.correo,
                telefono: req.body.telefono
            };
            const newPersona = Persona.build(personaProps);
    
            await this.params.personaCreator.create(newPersona);

            res.status(HTTP_RESPONSES.CREATED.code).json({
                data: personaProps
            });

        }catch(error: any){
            
            if(error instanceof  PersonaError){
                res.status(HTTP_RESPONSES.BAD_REQUEST.code).send(parseInputRequestError([error.getErrorJson()]))
                return;
            }

            throw error;
        }
    }
}

