import { AppDataSource } from '@datasource/mysql';
import { HabitacionUpdateDTO, HabitacionUpdateRepository } from './interfaces/habitacionUpdate.repository';
import { HabitacionEntity } from '@datasource/mysql/entities/habitacion.entity';

/**
 * Se encarga de actualizar una habitacion en la base de datos
 */
export class HabitacionUpdate implements HabitacionUpdateRepository{
    async update(habitacion: HabitacionUpdateDTO): Promise<void> {
        const habitacionRepository = AppDataSource.getRepository(HabitacionEntity);
        await habitacionRepository.update({ id: habitacion.habitacionId }, habitacion.habitacion);
    }
}

export const habitacionUpdate = new HabitacionUpdate();