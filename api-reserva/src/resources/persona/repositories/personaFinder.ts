import { PersonaProps } from '@persona/models/persona.model';
import { AppDataSource } from '@datasource/mysql';
import { PersonaEntity } from '@datasource/mysql/entities';
import { PersonaFinderRepository, SelectFieldsPersona } from './interfaces/personaFinder.repository';


/**
 * Se encarga de buscar personas en la base de datos
 */
export class PersonaFinder implements PersonaFinderRepository{
    async findAll(selectFields?: SelectFieldsPersona): Promise<PersonaProps[]> {
        const personaRepository = AppDataSource.getRepository(PersonaEntity);

        if(typeof selectFields === 'undefined' ) return await personaRepository.find();

        return await personaRepository.find({
            select: selectFields
        });

    }
}

export const personaFinder = new PersonaFinder();