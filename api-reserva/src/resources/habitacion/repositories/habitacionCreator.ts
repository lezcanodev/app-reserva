import { AppDataSource } from '@datasource/mysql';
import { HabitacionCreatorRepository } from './interfaces/habitacionCreator.repository';
import { Habitacion } from '@habitacion/models/habitacion.model';
import { HabitacionEntity } from '@datasource/mysql/entities/habitacion.entity';


/**
 * Se encarga de crear una nueva habitacion en la base de datos
 */
export class HabitacionCreator implements HabitacionCreatorRepository{

    async create(habitacion: Habitacion): Promise<void> {
        const habitacionRepository = AppDataSource.getRepository(HabitacionEntity);
        const habitacionProps = habitacion.getProps();

        await habitacionRepository.save({
            piso: habitacionProps.piso,
            numero: habitacionProps.numero,
            cantCamas: habitacionProps.cantCamas,
            tieneTelevision: habitacionProps.tieneTelevision,
            tieneFrigobar: habitacionProps.tieneFrigobar
        });

    }

}

export const habitacionCreator = new HabitacionCreator();