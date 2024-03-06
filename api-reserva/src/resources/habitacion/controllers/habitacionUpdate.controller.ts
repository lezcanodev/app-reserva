import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { HabitacionUpdateRepository } from '@habitacion/repositories/interfaces/habitacionUpdate.repository';
import { Request, Response } from 'express';


export interface HabitacionUpdateControllerParams{
    readonly habitacionUpdate: HabitacionUpdateRepository
}

export default class HabitacionUpdateController extends BaseController{

    public constructor(private readonly params: HabitacionUpdateControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        const {piso, numero, cantCamas, tieneTelevision, tieneFrigobar} = req.body;
        const habitacionProps: {[key: string]: string | boolean} = {};

        if(typeof piso !== 'undefined') habitacionProps['piso'] = piso;
        if(typeof numero !== 'undefined') habitacionProps['numero'] = numero;
        if(typeof cantCamas !== 'undefined') habitacionProps['cantCamas'] = cantCamas;
        if(typeof tieneTelevision !== 'undefined') habitacionProps['tieneTelevision'] = tieneTelevision === true || tieneTelevision === 'true';
        if(typeof tieneFrigobar !== 'undefined') habitacionProps['tieneFrigobar'] = tieneFrigobar === true || tieneFrigobar === 'true';

        await this.params.habitacionUpdate.update({
            habitacionId: req.body.habitacionId,
            habitacion: habitacionProps
        });

        res.status(HTTP_RESPONSES.OK.code).json({
            data: {
                id: req.body.habitacionId,
                ...habitacionProps
            }
        });
    }
}

