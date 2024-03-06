import { reservaCreator } from '@reserva/repositories/reservaCreator';
import ReservaCreatorController from './reservaCreator.controller';
import ReservaDeleteController from './reservaDelete.controller';
import { reservaDelete } from '@reserva/repositories/reservaDelete';
import ReservaUpdateController from './reservaUpdate.controller';
import { reservaUpdate } from '@reserva/repositories/reservaUpdate';
import ReservaFindAllController from './reservaFindAll.controller';
import { reservaFinder } from '@reserva/repositories/reservaFinder';
import ReservaFindAllFreeHabitacionesController from './reservaFindAllFreeHabitaciones.controller';



export const reservaCreatorController = new ReservaCreatorController({
    reservaCreator: reservaCreator
});

export const reservaDeleteController = new ReservaDeleteController({
    reservaDelete: reservaDelete
});

export const reservaUpdateController = new ReservaUpdateController({
    reservaUpdate: reservaUpdate
});

export const reservaFindAllController = new ReservaFindAllController({
    reservaFinder: reservaFinder
});

export const reservaFindAllFreeHabitacionesController = new ReservaFindAllFreeHabitacionesController({
    reservaFinder: reservaFinder
}) 