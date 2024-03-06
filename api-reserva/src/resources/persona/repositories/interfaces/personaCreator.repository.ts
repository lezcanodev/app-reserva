import { Persona } from '@persona/models/persona.model';


export interface PersonaCreatorRepository{
    /**
     * Crea una nueva persona
     * @param persona
     */
    create(persona: Persona): Promise<void>;
}