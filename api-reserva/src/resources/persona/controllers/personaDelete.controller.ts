import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { PersonaDeleteRepository } from '@persona/repositories/interfaces/personaDelete.repository';
import { Request, Response } from 'express';


export interface PersonaDeleteControllerParams{
    readonly personaDelete: PersonaDeleteRepository
}

export default class PersonaDeleteController extends BaseController{

    public constructor(private readonly params: PersonaDeleteControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        await this.params.personaDelete.delete(req.body.personaId);

        res.status(HTTP_RESPONSES.NO_CONTENT.code).json({});
    }
}

