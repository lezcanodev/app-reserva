import BaseController from '@core/controllers/baseController.controller';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import ReservaProps, { Reserva } from '@reserva/models/reserva.model';
import { ReservaCalcMonto } from '@reserva/models/services/reservaCalcMonto.service';
import { ReservaUpdateRepository } from '@reserva/repositories/interfaces/reservaUpdate.repository';
import { Request, Response } from 'express';


export interface ReservaUpdateControllerParams{
    readonly reservaUpdate: ReservaUpdateRepository
}

export default class ReservaUpdateController extends BaseController{

    public constructor(private readonly params: ReservaUpdateControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {

        const {reservaId, personaId, habitacionId, fechaEntrada, fechaSalida} = req.body;
        const reservaProps: Partial<ReservaProps> = {};
        
        if(typeof personaId !== 'undefined') reservaProps['personaId'] = personaId;
        if(typeof habitacionId !== 'undefined') reservaProps['habitacionId'] = habitacionId;

        if(typeof fechaEntrada !== 'undefined' || typeof fechaSalida !== 'undefined'){
            reservaProps['fechaEntrada'] = new Date(fechaEntrada);
            reservaProps['fechaSalida'] = new Date(fechaSalida);
            reservaProps['montoReserva'] = ReservaCalcMonto.calcMontoReserva(reservaProps.fechaEntrada, reservaProps.fechaSalida);
        }

        if(Object.keys(reservaProps).length !== 0){
            await this.params.reservaUpdate.update({
                reservaId: reservaId,
                reserva: reservaProps
            });
        }

        res.status(HTTP_RESPONSES.OK.code).json({
            data: {
                id: reservaId,
                ...reservaProps
            }
        });
    }
}

