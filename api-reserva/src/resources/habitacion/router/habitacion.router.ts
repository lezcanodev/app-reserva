
import { habitacionCreatorController, habitacionDeleteController, habitacionFinderController, habitacionUpdateController } from '@habitacion/controllers';
import { habitacionCreatorValidator } from '@habitacion/validators/habitacionCreator.validator';
import { habitacionDeleteValidator } from '@habitacion/validators/habitacionDelete.validator';
import { habitacionUpdateValidator } from '@habitacion/validators/habitacionUpdate.validator';
import express from 'express';

const baseHabitacionRouter = express.Router();

baseHabitacionRouter.get('/', 
    habitacionFinderController.handle.bind(habitacionFinderController)
);

baseHabitacionRouter.post('/', 
    habitacionCreatorValidator,
    habitacionCreatorController.handle.bind(habitacionCreatorController)
);

baseHabitacionRouter.put('/', 
    habitacionUpdateValidator,
    habitacionUpdateController.handle.bind(habitacionUpdateController)
);


baseHabitacionRouter.delete('/', 
    habitacionDeleteValidator,
    habitacionDeleteController.handle.bind(habitacionDeleteController)
);


export default baseHabitacionRouter;