import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity } from '@datasource/mysql/entities';
import { PersonaDeleteRepository } from './interfaces/personaDelete.repository';


/**
 * Se encarga de eliminar una  persona de la base de datos
 */
export class PersonaDelete implements PersonaDeleteRepository{
    async delete(personaId: number): Promise<void> {
        const personaRepository = AppDataSource.getRepository(PersonaEntity);
        await personaRepository.delete({ id: personaId });
    }
}

export const personaDelete = new PersonaDelete();