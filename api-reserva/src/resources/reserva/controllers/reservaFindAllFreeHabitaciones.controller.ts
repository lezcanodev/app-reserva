import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { ReservaCalcMonto } from '@reserva/models/services/reservaCalcMonto.service';
import { ReservaFinderRepository } from '@reserva/repositories/interfaces/reservaFinder.repository';
import { Request, Response } from 'express';


export interface ReservaFindAllControllerParams{
    readonly reservaFinder: ReservaFinderRepository
}

export default class ReservaFindAllFreeHabitacionesController extends BaseController{

    public constructor(private readonly params: ReservaFindAllControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {
    
        const fechaEntrada = new Date((req.query.fehcaEntrada as string));
        const fechaSalida = new Date((req.query.fechaSalida as string));
        const freeHabitaciones = await this.params.reservaFinder.findAllFreeHabitaciones(fechaEntrada, fechaSalida);
        const cost = ReservaCalcMonto.calcMontoReserva(fechaEntrada, fechaSalida);
        
        
        res.status(HTTP_RESPONSES.OK.code).json({
            cost:  cost,
            data: freeHabitaciones
        });

    }
}

