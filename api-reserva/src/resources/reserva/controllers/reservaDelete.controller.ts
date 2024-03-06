import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { ReservaDeleteRepository } from '@reserva/repositories/interfaces/reservaDelete.repository';
import { Request, Response } from 'express';


export interface ReservaDeleteControllerParams{
    readonly reservaDelete: ReservaDeleteRepository
}

export default class ReservaDeleteController extends BaseController{

    public constructor(private readonly params: ReservaDeleteControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        await this.params.reservaDelete.delete(req.body.reservaId);

        res.status(HTTP_RESPONSES.NO_CONTENT.code).json({});
    }
}

