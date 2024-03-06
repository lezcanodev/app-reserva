import ReservaProps from '@reserva/models/reserva.model';
import { ReservaFinderRepository } from './interfaces/reservaFinder.repository';
import { AppDataSource } from '@datasource/mysql';
import { HabitacionEntity, ReservaEntity } from '@datasource/mysql/entities';
import HabitacionProps from '@habitacion/models/habitacion.model';


export class ReservaFinder implements ReservaFinderRepository{
    
    async findAllFreeHabitaciones(fechaEntrada: Date, fechaSalida: Date): Promise<HabitacionProps[]> {
       const habitacionRepository = AppDataSource.getRepository(HabitacionEntity);

       const query =  habitacionRepository.createQueryBuilder('habitaciones')
                .leftJoinAndSelect('habitaciones.reservas', 'reservas')
                .select(['habitaciones.id as id', 'habitaciones.habitacion_piso as piso', 'habitaciones.habitacion_nro as numero'])
                .where((qb) => {
                    const subQuery = qb.subQuery()
                    .select('1')
                    .from(ReservaEntity ,'reservas')
                    .where('(reservas.fecha_entrada >= :fechaEntrada AND reservas.fecha_entrada <= :fechaSalida)', {fechaEntrada, fechaSalida})
                    .orWhere('(reservas.fecha_salida >= :fechaEntrada AND reservas.fecha_salida <= :fechaSalida)', {fechaEntrada, fechaSalida})
                    .orWhere('(:fechaEntrada >= reservas.fecha_entrada AND :fechaEntrada <= reservas.fecha_salida)', {fechaEntrada})
                    .orWhere('(:fechaSalida >= reservas.fecha_entrada AND :fechaSalida <= reservas.fecha_salida)', {fechaSalida})
                    .getQuery();
                    
                    return `NOT EXISTS (${subQuery})`;
                })                
                .orWhere('(reservas.habitacion_id IS NULL)')
                .distinct(true);

        return await query.execute();
    }

    async findById(reservaId: number): Promise<ReservaProps | null> {
        const reservaRepository = AppDataSource.getRepository(ReservaEntity);
        return await reservaRepository.findOneBy({
            id: reservaId
        });
    }

    async findAll(): Promise<ReservaProps[]> {
        const reservaRepository = AppDataSource.getRepository(ReservaEntity);

        return await reservaRepository.find({
            select: {
                id: true,
                fechaReserva: true,
                fechaEntrada: true,
                fechaSalida: true,
                montoReserva: true,
                habitacion: {
                    id: true,
                    piso: true,
                    numero: true,
                    cantCamas: true,
                    tieneFrigobar: true,
                    tieneTelevision: true
                },
                persona: {
                    id: true,
                    nroDocumento: true,
                    nombre: true,
                    apellido: true,
                    correo: true,
                    telefono: true
                }
            },
            relations: {
                habitacion: true,
                persona: true
            }
        });
    }
}

export const reservaFinder = new ReservaFinder();