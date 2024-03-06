import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { HabitacionDeleteRepository } from '@habitacion/repositories/interfaces/habitacionDelete.repository';
import { Request, Response } from 'express';


export interface HabitacionDeleteControllerParams{
    readonly habitacionDelete: HabitacionDeleteRepository
}

export default class HabitacionDeleteController extends BaseController{

    public constructor(private readonly params: HabitacionDeleteControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        await this.params.habitacionDelete.delete(req.body.habitacionId);

        res.status(HTTP_RESPONSES.NO_CONTENT.code).json({});
    }
}

