
export interface PersonaDeleteRepository{
    /**
     * Elimina una persona por su id 
     * @param personaId id de la persona
     */
    delete(personaId: number): Promise<void>;
}