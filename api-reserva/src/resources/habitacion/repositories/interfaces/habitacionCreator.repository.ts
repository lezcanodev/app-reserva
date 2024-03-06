import { Habitacion } from '@habitacion/models/habitacion.model';


export interface HabitacionCreatorRepository{
    /**
     * Crea una nueva habitacion
     * @param habitacion
     */
    create(habitacion: Habitacion): Promise<void>;
}