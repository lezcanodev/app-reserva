

export interface IsUnbookeadHabitacionParams{
    habitacionId: number;
    fechaEntrada: Date;
    fechaSalida: Date;
    exceptReservaId?: number;
}

export interface ReservaCheckerRepository{
    /**
     * Verifica si una habitacion no esta ocupada
     * @param params 
     */
    isFreeReserva(params: IsUnbookeadHabitacionParams): Promise<Boolean>;
}