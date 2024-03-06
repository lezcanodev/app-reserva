import HabitacionProps from '@habitacion/models/habitacion.model';


export interface HabitacionUpdateDTO{
    habitacionId: number;
    habitacion: Partial<Omit<HabitacionProps, 'id'>>
}

export interface HabitacionUpdateRepository{

    /**
     * Actualiza una habitacion
     * @param updateHabitacion
     */
    update(updatePersona: HabitacionUpdateDTO): Promise<void>;
}