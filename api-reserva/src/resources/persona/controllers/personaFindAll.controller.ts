import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { PersonaFinderRepository, SelectFieldsPersona } from '@persona/repositories/interfaces/personaFinder.repository';
import { Request, Response } from 'express';


export interface PersonaFindAllControllerParams{
    readonly personaFinder: PersonaFinderRepository
}

export default class PersonaFindAllController extends BaseController{

    public constructor(private readonly params: PersonaFindAllControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        let selectFields: SelectFieldsPersona = {};

        if(typeof req.query.fields !== 'undefined'){
            (req.query.fields as string).split(',').forEach((field: string) => {
                if(field === 'id') selectFields.id = true;
                if(field === 'nombre') selectFields.nombre = true;
                if(field === 'apellido') selectFields.apellido = true;
                if(field === 'nroDocumento') selectFields.nroDocumento = true;
                if(field === 'correo') selectFields.correo = true;
                if(field === 'telefono') selectFields.telefono = true;
            });
        }

        const personas = await this.params.personaFinder.findAll(selectFields);

        res.status(HTTP_RESPONSES.OK.code).json({
            data: personas
        });

    }
}

