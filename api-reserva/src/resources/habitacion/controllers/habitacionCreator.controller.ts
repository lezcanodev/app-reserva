import BaseController from '@core/controllers/baseController.controller';
import { parseInputRequestError } from '@core/helper/formatResponse.helper';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { HabitacionError } from '@habitacion/models/habitacion.error';
import { Habitacion } from '@habitacion/models/habitacion.model';
import { HabitacionCreatorRepository } from '@habitacion/repositories/interfaces/habitacionCreator.repository';
import { Request, Response } from 'express';


export interface HabitacionCreatorControllerParams{
    readonly habitacionCreator: HabitacionCreatorRepository
}

export default class HabitacionCreatorController extends BaseController{

    public constructor(private readonly params: HabitacionCreatorControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {
        try{
            const habitacionProps = {
                piso: req.body.piso,
                numero: req.body.numero,
                cantCamas: req.body.cantCamas,
                tieneTelevision: req.body.tieneTelevision === 'true' || req.body.tieneTelevision === true,
                tieneFrigobar: req.body.tieneFrigobar === 'true' || req.body.tieneFrigobar === true
            };

            const newHabitacion = Habitacion.build(habitacionProps);
    
            await this.params.habitacionCreator.create(newHabitacion);

            res.status(HTTP_RESPONSES.CREATED.code).json({
                data: habitacionProps
            });

        }catch(error: any){
            
            if(error instanceof  HabitacionError){
                res.status(HTTP_RESPONSES.BAD_REQUEST.code).json({
                    errors: [error.getErrorJson()]
                })
                return;
            }

            throw error;
        }
    }
}

