import { AppDataSource } from '@datasource/mysql';
import { HabitacionFinderRepository } from './interfaces/habitacionFinder.repository';
import HabitacionProps from '@habitacion/models/habitacion.model';
import { HabitacionEntity } from '@datasource/mysql/entities/habitacion.entity';


/**
 * Se encarga de buscar habitaciones en la base de datos
 */
export class HabitacionFinder implements HabitacionFinderRepository{
    async findAll(): Promise<HabitacionProps[]> {
        const habitacionRepository = AppDataSource.getRepository(HabitacionEntity);
        return await habitacionRepository.find({
            select: {
                id: true,
                numero: true,
                piso: true,
                cantCamas: true,
                tieneFrigobar: true,
                tieneTelevision: true,
                reservas: {
                    fechaEntrada: true,
                    fechaSalida: true
                }
            },
            relations: {
                reservas: true
            }
        });
    }
}

export const habitacionFinder = new HabitacionFinder();