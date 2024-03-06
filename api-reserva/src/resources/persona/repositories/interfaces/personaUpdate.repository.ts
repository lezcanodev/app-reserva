import  { Persona, PersonaProps } from '@persona/models/persona.model';


export interface PersonaUpdateDTO{
    personaId: number;
    persona: Partial<Omit<PersonaProps, 'id'>>
}

export interface PersonaUpdateRepository{

    /**
     * Actualiza una persona
     * @param updatePersona 
     */
    update(updatePersona: PersonaUpdateDTO): Promise<void>;
}