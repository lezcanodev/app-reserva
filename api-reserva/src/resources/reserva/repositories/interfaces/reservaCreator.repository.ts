import { Reserva } from '@reserva/models/reserva.model';


export interface ReservaCreatorRepository{
    /**
     * Crea una nueva reserva
     * @param persona
     */
    create(reserva: Reserva): Promise<void>;
}