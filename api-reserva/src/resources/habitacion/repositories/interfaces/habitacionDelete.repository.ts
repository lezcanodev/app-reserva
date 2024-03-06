
export interface HabitacionDeleteRepository{
    /**
     * Elimina una habitacion por su id 
     * @param personaId id de la persona
     */
    delete(habitacionId: number): Promise<void>;
}