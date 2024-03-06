import { Persona } from '@persona/models/persona.model';
import { PersonaCreatorRepository } from './interfaces/personaCreator.repository';
import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity } from '@datasource/mysql/entities';


/**
 * Se encarga de crear una nueva persona en la base de datos
 */
export class PersonaCreator implements PersonaCreatorRepository{
    async create(persona: Persona): Promise<void> {
        const personaRepository = AppDataSource.getRepository(PersonaEntity);
        const personaProps = persona.getProps();

        await personaRepository.save({
            nombre: personaProps.nombre,
            apellido: personaProps.apellido,
            nroDocumento: personaProps.nroDocumento,
            correo: personaProps.correo,
            telefono: personaProps.telefono
        });
    }
}

export const personaCreator = new PersonaCreator();