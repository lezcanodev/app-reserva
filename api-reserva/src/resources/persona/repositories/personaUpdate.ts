import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity } from '@datasource/mysql/entities';
import { PersonaUpdateDTO, PersonaUpdateRepository } from './interfaces/personaUpdate.repository';


/**
 * Se encarga de actualiza una persona en la base de datos
 */
export class PersonaUpdate implements PersonaUpdateRepository{
    async update(persona: PersonaUpdateDTO): Promise<void> {
        const personaRepository = AppDataSource.getRepository(PersonaEntity);
        await personaRepository.update({ id: persona.personaId }, persona.persona);
    }
}

export const personaUpdate = new PersonaUpdate();