import HabitacionProps from '@habitacion/models/habitacion.model';


export interface HabitacionFinderRepository{
    /**
     * Obtiene todas las habitaciones
     */
    findAll(): Promise<HabitacionProps[]>;
}