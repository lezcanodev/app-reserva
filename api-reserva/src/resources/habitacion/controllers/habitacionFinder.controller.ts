import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { HabitacionFinderRepository } from '@habitacion/repositories/interfaces/habitacionFinder.repository';
import { Request, Response } from 'express';


export interface HabitacionFinderControllerParams{
    readonly habitacionFinder: HabitacionFinderRepository
}

export default class HabitacionFinderController extends BaseController{

    public constructor(private readonly params: HabitacionFinderControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        const habitaciones = await this.params.habitacionFinder.findAll();

        res.status(HTTP_RESPONSES.OK.code).json({
            data: habitaciones
        });

    }
}

