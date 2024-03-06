import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { ReservaFinderRepository } from '@reserva/repositories/interfaces/reservaFinder.repository';
import { Request, Response } from 'express';


export interface ReservaFindAllControllerParams{
    readonly reservaFinder: ReservaFinderRepository
}

export default class ReservaFindAllController extends BaseController{

    public constructor(private readonly params: ReservaFindAllControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        const reservas = await this.params.reservaFinder.findAll();
     
        res.status(HTTP_RESPONSES.OK.code).json({
            data: reservas
        });

    }
}

