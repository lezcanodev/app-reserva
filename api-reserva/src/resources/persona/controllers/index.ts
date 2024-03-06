import { personaCreator } from '@persona/repositories/personaCreator';
import PersonaCreatorController from './personaCreator.controller';
import PersonaUpdateController from './personaUpdate.controller';
import { personaUpdate } from '@persona/repositories/personaUpdate';
import PersonaFindAllController from './personaFindAll.controller';
import { personaFinder } from '@persona/repositories/personaFinder';
import PersonaDeleteController from './personaDelete.controller';
import { personaDelete } from '@persona/repositories/personaDelete';


export const personaCreatorController = new PersonaCreatorController({
    personaCreator: personaCreator
});

export const personaUpdateController = new PersonaUpdateController({
    personaUpdate: personaUpdate
});

export const personaFinderController = new PersonaFindAllController({
    personaFinder: personaFinder
});

export const personaDeleteController = new PersonaDeleteController({
    personaDelete: personaDelete
});