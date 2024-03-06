import { habitacionCreator } from '@habitacion/repositories/habitacionCreator';
import HabitacionCreatorController from './habitacionCreator.controller';
import HabitacionDeleteController from './habitacionDelete.controller';
import { habitacionDelete } from '@habitacion/repositories/habitacionDelete';
import HabitacionFinderController from './habitacionFinder.controller';
import { habitacionFinder } from '@habitacion/repositories/habitacionFinder';
import HabitacionUpdateController from './habitacionUpdate.controller';
import { habitacionUpdate } from '@habitacion/repositories/habitacionUpdate';


export const habitacionCreatorController = new HabitacionCreatorController({
    habitacionCreator: habitacionCreator
});

export const habitacionUpdateController = new HabitacionUpdateController({
    habitacionUpdate: habitacionUpdate
});

export const habitacionFinderController = new HabitacionFinderController({
    habitacionFinder: habitacionFinder
});

export const habitacionDeleteController = new HabitacionDeleteController({
    habitacionDelete: habitacionDelete
});
