
import { personaCreatorController, personaDeleteController, personaFinderController, personaUpdateController } from '@persona/controllers';
import { personaCreatorValidator } from '@persona/validators/personaCreator.validator';
import { personaDeleteValidator } from '@persona/validators/personaDelete.validator';
import { personaFindAllValidator } from '@persona/validators/personaFindAll.validator';
import { personaUpdateValidator } from '@persona/validators/personaUpdate.validator';
import express from 'express';

const basePersonaRouter = express.Router();

basePersonaRouter.get('/',
    personaFindAllValidator, 
    personaFinderController.handle.bind(personaFinderController)
);

basePersonaRouter.post('/', 
    personaCreatorValidator,
    personaCreatorController.handle.bind(personaCreatorController)
);

basePersonaRouter.put('/', 
    personaUpdateValidator,
    personaUpdateController.handle.bind(personaUpdateController)
);

basePersonaRouter.delete('/', 
    personaDeleteValidator,
    personaDeleteController.handle.bind(personaDeleteController)
);

export default basePersonaRouter;