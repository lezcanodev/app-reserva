
export interface ReservaDeleteRepository{
    /**
     * Elimina una reserva por su id 
     * @param reservaId id de la reserva
     */
    delete(reservaId: number): Promise<void>;
}