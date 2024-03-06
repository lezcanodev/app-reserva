import { AppDataSource } from '@datasource/mysql';
import { HabitacionDeleteRepository } from './interfaces/habitacionDelete.repository';
import { HabitacionEntity } from '@datasource/mysql/entities/habitacion.entity';


/**
 * Se encarga de eliminar una  habitacion de la base de datos
 */
export class HabitacionDelete implements HabitacionDeleteRepository{
    async delete(habitacionId: number): Promise<void> {
        const habitacionRepository = AppDataSource.getRepository(HabitacionEntity);
        await habitacionRepository.delete({ id: habitacionId });
    }
}

export const habitacionDelete = new HabitacionDelete();