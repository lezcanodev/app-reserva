import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { PersonaUpdateRepository } from '@persona/repositories/interfaces/personaUpdate.repository';
import { Request, Response } from 'express';


export interface PersonaUpdateControllerParams{
    readonly personaUpdate: PersonaUpdateRepository
}

export default class PersonaUpdateController extends BaseController{

    public constructor(private readonly params: PersonaUpdateControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {
    
        const {nombre, apellido, nroDocumento, correo, telefono} = req.body;
        const personaProps: {[key: string]: string} = {};

        if(typeof nombre !== 'undefined') personaProps['nombre'] = nombre;
        if(typeof apellido !== 'undefined') personaProps['apellido'] = apellido;
        if(typeof nroDocumento !== 'undefined') personaProps['nroDocumento'] = nroDocumento;
        if(typeof correo !== 'undefined') personaProps['correo'] = correo;
        if(typeof telefono !== 'undefined') personaProps['telefono'] = telefono;

        await this.params.personaUpdate.update({
            personaId: req.body.personaId,
            persona: personaProps
        });

        res.status(HTTP_RESPONSES.OK.code).json({
            data: {
                id: req.body.personaId,
                ...personaProps
            }
        });
    }
}

