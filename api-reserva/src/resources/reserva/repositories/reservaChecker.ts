
import { AppDataSource } from '@datasource/mysql';
import { ReservaEntity } from '@datasource/mysql/entities';
import { IsUnbookeadHabitacionParams, ReservaCheckerRepository } from './interfaces/reservaChecker.repository';
import { Between,  FindOptionsWhere,  LessThanOrEqual, MoreThan, MoreThanOrEqual, Not } from 'typeorm';



export class ReservaChecker implements ReservaCheckerRepository{
    async isFreeReserva({habitacionId,fechaEntrada, fechaSalida, exceptReservaId}: IsUnbookeadHabitacionParams): Promise<boolean> {

        const reservaRepository = AppDataSource.getRepository(ReservaEntity);
        let where: FindOptionsWhere<ReservaEntity>[] = [
            //caso 1: existe una fecha de entrada que pertenezca al rango de reserva
            { habitacionId: habitacionId  ,fechaEntrada: Between(fechaEntrada, fechaSalida) },
            // caso 2: existe una fecha de salida que pertenezca al rango de reserva
            { habitacionId: habitacionId, fechaSalida: Between(fechaEntrada, fechaSalida) },
            // caso 3: la fecha de entrada a reservar pertenece a algun rango
            { habitacionId: habitacionId, fechaEntrada: LessThanOrEqual(fechaEntrada), fechaSalida: MoreThanOrEqual(fechaEntrada) },
            //caso 4: la fecha de salida que queremos reservar pertenece a algun rango
            {
                habitacionId: habitacionId,
                fechaEntrada: LessThanOrEqual(fechaSalida),
                fechaSalida: MoreThanOrEqual(fechaSalida)
            }
        ];

        if(typeof exceptReservaId !== 'undefined'){
            where = [
                //caso 1: existe una fecha de entrada que pertenezca al rango de reserva
                { id: Not(exceptReservaId), habitacionId: habitacionId  ,fechaEntrada: Between(fechaEntrada, fechaSalida) },
                // caso 2: existe una fecha de salida que pertenezca al rango de reserva
                { id: Not(exceptReservaId), habitacionId: habitacionId, fechaSalida: Between(fechaEntrada, fechaSalida) },
                // caso 3: la fecha de entrada a reservar pertenece a algun rango
                {id: Not(exceptReservaId), habitacionId: habitacionId, fechaEntrada: LessThanOrEqual(fechaEntrada), fechaSalida: MoreThanOrEqual(fechaEntrada) },
                //caso 4: la fecha de salida que queremos reservar pertenece a algun rango
                {id: Not(exceptReservaId), habitacionId: habitacionId, fechaEntrada: LessThanOrEqual(fechaSalida), fechaSalida: MoreThanOrEqual(fechaSalida) }
            ];
        }



        const bookedHabitacion = await reservaRepository.countBy(where);
        
        
        // si bookedHabitacion es igual a cero no hay reservas en el rango de fechas, por lo que esta libre para reservar
        return bookedHabitacion == 0;          
    }
}

export const reservaChecker = new ReservaChecker();