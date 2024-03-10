import BaseController from '@core/controllers/baseController.controller';
import { parseInputRequestError } from '@core/helper/formatResponse.helper';
import { HTTP_RESPONSES } from '@core/helper/httpCodes.helper';
import { ReservaError } from '@reserva/models/reserva.error';
import { Reserva } from '@reserva/models/reserva.model';
import { ReservaCreatorRepository } from '@reserva/repositories/interfaces/reservaCreator.repository';
import { Request, Response } from 'express';


export interface ReservaCreatorControllerParams{
    readonly reservaCreator: ReservaCreatorRepository
}

export default class ReservaCreatorController extends BaseController{

    public constructor(private readonly params: ReservaCreatorControllerParams){
        super()
    };

    protected async execute(req: Request, res: Response): Promise<void> {
        try{
            const reservaProps = {
                personaId: req.body.personaId,
                habitacionId: req.body.habitacionId,
                fechaEntrada: new Date(req.body.fechaEntrada),
                fechaSalida: new Date(req.body.fechaSalida),
                fechaReserva: null,
                montoReserva: null
            };
            const newReserva = Reserva.build(reservaProps);
            
            await this.params.reservaCreator.create(newReserva);


            res.status(HTTP_RESPONSES.CREATED.code).json({
                data: newReserva.getProps()
            });

        }catch(error: any){
            
            if(error instanceof  ReservaError){
                res.status(HTTP_RESPONSES.BAD_REQUEST.code).send(parseInputRequestError([error.getErrorJson()]))
                return;
            }

            throw error;
        }
    }
}

