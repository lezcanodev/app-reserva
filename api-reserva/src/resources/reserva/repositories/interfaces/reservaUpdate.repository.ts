import ReservaProps, { Reserva } from '@reserva/models/reserva.model';


export interface ReservaUpdateDTO{
    reservaId: number;
    reserva: Partial<Omit<ReservaProps, 'id' | 'fechaReserva'>>
}

export interface ReservaUpdateRepository{

    /**
     * Actualiza una reserva
     * @param updateReserva
     */
    update(updateReserva: ReservaUpdateDTO): Promise<void>;
}