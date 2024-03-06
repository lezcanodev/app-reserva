import HabitacionProps from '@habitacion/models/habitacion.model';
import ReservaProps from '@reserva/models/reserva.model';


export interface ReservaFinderRepository{
    findAll(): Promise<ReservaProps[]>;
    findById(reservaId: number): Promise<ReservaProps | null>;
    findAllFreeHabitaciones(fechaEntrada: Date, fechaSalida: Date): Promise<HabitacionProps[]>;
}